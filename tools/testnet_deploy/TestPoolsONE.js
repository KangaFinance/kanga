// This will deploy testnet erc20 contracts and liquidity pool
// These tokens and pools may vary for each testnet

// Harmony Testnet initially modelled off top 6 pairs here - https://analytics-harmony.sushi.com/
// Tokens 1ETH, WONE, 1WBTC, 1USDT, 1USDC, BUSD, bscBUSD, 
// Pairs 1WBTC-1ETH, 1ETH-WONE, 1WBTC-WONE, 1USDC-WONE, 1USDT-1USDC, bscBUSD-BUSD
// Will also add a pair for Terra and One as part of the prototype UST-WONE


module.exports = async function ({ getNamedAccounts, deployments }) {

  const { BigNumber } = require("ethers")

  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy("ERC20Mock", {
    from: deployer,
    args: ["1ETH", "1ETH", BigNumber.from("10000000000").mul(BigNumber.from(10).pow(18))],
    log: true,
    deterministicDeployment: false,
  })

  await deploy("ERC20Mock", {
    from: deployer,
    args: ["1WBTC", "1WBTC", BigNumber.from("10000000000").mul(BigNumber.from(10).pow(18))],
    log: true,
    deterministicDeployment: false,
  })
  await deploy("ERC20Mock", {
    from: deployer,
    args: ["WONE", "WONE", BigNumber.from("10000000000").mul(BigNumber.from(10).pow(18))],
    log: true,
    deterministicDeployment: false,
  })

  await deploy("ERC20Mock", {
    from: deployer,
    args: ["1USDT", "1USDT", BigNumber.from("10000000000").mul(BigNumber.from(10).pow(18))],
    log: true,
    deterministicDeployment: false,
  })

  await deploy("ERC20Mock", {
    from: deployer,
    args: ["1USDC", "1USDC", BigNumber.from("10000000000").mul(BigNumber.from(10).pow(18))],
    log: true,
    deterministicDeployment: false,
  })

  await deploy("ERC20Mock", {
    from: deployer,
    args: ["BUSD", "BUSD", BigNumber.from("10000000000").mul(BigNumber.from(10).pow(18))],
    log: true,
    deterministicDeployment: false,
  })

  await deploy("ERC20Mock", {
    from: deployer,
    args: ["bscBUSD", "bscBUSD", BigNumber.from("10000000000").mul(BigNumber.from(10).pow(18))],
    log: true,
    deterministicDeployment: false,
  })

  await deploy("ERC20Mock", {
    from: deployer,
    args: ["UST", "UST", BigNumber.from("10000000000").mul(BigNumber.from(10).pow(18))],
    log: true,
    deterministicDeployment: false,
  })
}

module.exports.tags = ["TestPoolsONE"]
// module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02"]
