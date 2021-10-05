module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const kanga = await deployments.get("KangaToken")

  await deploy("Billabong", {
    from: deployer,
    args: [kanga.address],
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["Billabong"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "KangaToken"]
