 module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy("KangaToken", {
    from: deployer,
    log: true,
    deterministicDeployment: false
  })

  //Mint all tokens but reward tokens and assign vesting schedule
  const kangaToken = await ethers.getContract("KangaToken")
  console.log(`deployer: ${JSON.stringify(deployer)}`)
  await kangaToken.mint(deployer, "10000000000000000000000000000000")
}

module.exports.tags = ["KangaToken"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"]
