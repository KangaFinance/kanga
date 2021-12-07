const { ChainId } = require("@kangafinance/sdk")


const KANGA = {
  [ChainId.MATIC]: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
  //TODO Need to update this after each deploy of KANGA Token
  [ChainId.KOVAN]: '0xA8805F7728D45b4FE135a4a44b965E2Eae91C964',
  [ChainId.HARMONY_TESTNET]: '0xb62E57A930bDd4EC9bD01F9701690351eAf27Be3'
}

module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const chainId = await getChainId()

  let kangaAddress;

  if (chainId === '31337') {
    kangaAddress = (await deployments.get("KangaToken")).address
  } else if (chainId in KANGA) {
    kangaAddress = KANGA[chainId]
  } else {
    throw Error("No KANGA!")
  }

  await deploy("MiniBreederV2", {
    from: deployer,
    args: [kangaAddress],
    log: true,
    deterministicDeployment: false
  })

  const miniBreederV2 = await ethers.getContract("MiniBreederV2")
  if (await miniBreederV2.owner() !== dev) {
    console.log("Transfer ownership of MiniBreeder to dev")
    await (await miniBreederV2.transferOwnership(dev, true, false)).wait()
  }
}

module.exports.tags = ["MiniBreederV2"]
// module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"]
