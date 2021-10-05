// NOTE
// You must do an initial deploy to generate the bytecode it looks like this

/*
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy("UniswapV2Pair", {
    from: deployer,
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["UniswapV2Pair"]

*/



// Defining bytecode and abi from original contract copied from harmony testnet deploy to ensure bytecode matches and it produces the same pair code hash
const {
  bytecode,
  abi,
} = require("../deployments/master/UniswapV2Pair.json");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy("UniswapV2Pair", {
    contract: {
      abi,
      bytecode,
    },
    from: deployer,
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["UniswapV2Pair"]
