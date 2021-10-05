const { WETH } = require("@kangafinance/sdk")

module.exports = async function ({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const chainId = await getChainId()

  const factory = await ethers.getContract("UniswapV2Factory")
  const billabong = await ethers.getContract("Billabong")
  const kanga = await ethers.getContract("KangaToken")
  
  let wethAddress;
  
  if (chainId === '31337') {
    wethAddress = (await deployments.get("WETH9Mock")).address
  } else if (chainId === '1666700000') {
    //TODO this is the WONE address for Harmony Testnet
    wethAddress = '0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2'
  } else if (chainId in WETH) {
    wethAddress = WETH[chainId].address
  } else {
    throw Error("No WETH!")
  }

  await deploy("KangaMaker", {
    from: deployer,
    args: [factory.address, billabong.address, kanga.address, wethAddress],
    log: true,
    deterministicDeployment: false
  })

  const maker = await ethers.getContract("KangaMaker")
  if (await maker.owner() !== dev) {
    console.log("Setting maker owner")
    await (await maker.transferOwnership(dev, true, false)).wait()
  }
}

module.exports.tags = ["KangaMaker"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "Billabong", "KangaToken"]