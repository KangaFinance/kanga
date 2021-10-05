module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const kanga = await ethers.getContract("KangaToken")
  
  const { address } = await deploy("MasterBreeder", {
    from: deployer,
    args: [kanga.address, dev, "1000000000000000000000", "0", "1000000000000000000000"],
    log: true,
    deterministicDeployment: false
  })

  if (await kanga.owner() !== address) {
    // Transfer Kanga Ownership to Breeder
    console.log("Transfer Kanga Ownership to Breeder")
    await (await kanga.transferOwnership(address)).wait()
  }

  const masterBreeder = await ethers.getContract("MasterBreeder")
  if (await masterBreeder.owner() !== dev) {
    // Transfer ownership of MasterBreeder to dev
    console.log("Transfer ownership of MasterBreeder to dev")
    await (await masterBreeder.transferOwnership(dev)).wait()
  }
}

module.exports.tags = ["MasterBreeder"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "KangaToken"]
