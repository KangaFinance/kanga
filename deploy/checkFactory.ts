//To run this use
// yarn hardhat --network harmony-testnet deploy --tags TestFactory
// yarn run harmony-testnet:testFactory

/*
Sample Working Transaction (for Deposit of USDT USDC)
- 0x744de74bccf822ec62057b7e41b11e788c6316d7a05cdbe064872ea6b18e15e8
- https://explorer.pops.one/tx/0x744de74bccf822ec62057b7e41b11e788c6316d7a05cdbe064872ea6b18e15e8?activeTab=0

- Sample Transaction which didn't work (for Deposit of USDT USDC)
- 0x662b03a5b44c57d2574b8acf06bd0936ed9e4a0b14f561875cf5011d61090403
- https://explorer.pops.one/tx/0x662b03a5b44c57d2574b8acf06bd0936ed9e4a0b14f561875cf5011d61090403?activeTab=0

*/

import { expect } from "chai";
import { ADDRESS_ZERO } from "../test/utilities";
// import { prepare, deploy, getBigNumber, createKLP, addLiquidityKLP } from "./utilities"

module.exports = async function ({ethers, getNamedAccounts, deployments }) {

    const { BigNumber } = require("ethers")
  
    const { deploy } = deployments
 
    // Accounts
    const { deployer, dev } = await getNamedAccounts()
    console.log(`deployer: ${JSON.stringify(deployer)}`)
    console.log(`dev: ${JSON.stringify(dev)}`) 

    //Router
    const router = (await ethers.getContract("UniswapV2Router02",dev)) //dev is feetoSetter
    const routerAddress = router.address
    console.log(`router.address: ${router.address}`)
    console.log(`router.factory.address: ${JSON.stringify(await router.factory())}`)

    // Factory
    const factory = (await ethers.getContract("UniswapV2Factory",dev)) //dev is feetoSetter
    const factoryAddress = factory.address
    console.log(`factory.address: ${factory.address}`)
    let fee_too = (await factory.feeTo())
    console.log(`fee_to: ${fee_too}`)
    const feeToSetter = (await factory.feeToSetter())
    console.log(`feeToSetter: ${feeToSetter}`)
    const migrator = (await factory.migrator())
    console.log(`migrator: ${migrator}`)
    const INIT_CODE_PAIR_HASH = (await factory.pairCodeHash())
    console.log(`INIT_CODE_PAIR_HASH: ${INIT_CODE_PAIR_HASH}`)

    // UniswapV2Pair
    // const pair = await ethers.getContractFactory("UniswapV2Pair");
    // const USDTUSDCaddress="0x96324beaacd5de48eee379bea08522bc07dcf338";
    // const pairUSDTUSDC = await pair.attach(
    //   "0x96324beaacd5de48eee379bea08522bc07dcf338" // could replace this with factory.getPair()
    // );
    // console.log(`pair.factory: ${await pairUSDTUSDC.factory()}`)
    // console.log(`pair.token0: ${await pairUSDTUSDC.token0()}`)
    // console.log(`pair.token1: ${await pairUSDTUSDC.token1()}`)
    // console.log(`pair.kLast: ${await pairUSDTUSDC.kLast()}`)
    // console.log(`pair.price0CumulativeLast: ${await pairUSDTUSDC.price0CumulativeLast()}`)
    // console.log(`pair.price1CumulativeLast: ${await pairUSDTUSDC.price1CumulativeLast()}`)
    // console.log(`pair.totalSupply: ${await pairUSDTUSDC.totalSupply()}`)
    // console.log(`pair.MINIMUM_LIQUIDITY: ${await pairUSDTUSDC.MINIMUM_LIQUIDITY()}`)
    // console.log(`pair.getReserves: ${JSON.stringify(await pairUSDTUSDC.getReserves())}`)
    // console.log(`block.timestamp: ${JSON.stringify(await ethers.provider.getBlock('latest'))}`)

    // kangaMaker
    const kangaMaker = (await ethers.getContract("KangaMaker"))
    console.log(`kangaMaker.address: ${kangaMaker.address}`)
    const kangaMakerAddress = kangaMaker.address

    // 
    
    // To update the fee to we can only use the feeSetter which is configured as dev in hardhat config
    // Set the feeTo
    // 0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8 Wallet address we have for FeeTo on Harmony Testnet
    console.log(`Setting feeToo`)
    // Uncomment one of these lines to update the feeTo
    // await (await factory.setFeeTo(kangaMakerAddress)).wait() //KangaMaker Contract
    await (await factory.setFeeTo("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8")).wait() // Fee to Setter account
    // await (await factory.setFeeTo(ADDRESS_ZERO)).wait() // Turn Fee off
    let fee_too_new = (await factory.feeTo())
    console.log(`fee_to_new after setting it: ${fee_too_new}`)
}

module.exports.tags = ["TestFactory"]

// Old Code to be deleted
// const factory = await Factory.attach(FactoryAddress)