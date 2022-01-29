import { expect } from "chai";
import { prepare, deploy, getBigNumber, createKLP, addLiquidityKLP, removeLiquidityKLP, advanceBlock, advanceBlockTo, getBlockTimestamp } from "./utilities"
import { keccak256 } from '@ethersproject/solidity'

const {
  bytecode,
  abi,
} = require("../deployments/master/UniswapV2Pair.json");

const MANUAL_INIT_CODE_HASH = keccak256(['bytes'],[bytecode]);
  
describe("KangaMaker", function () {
  before(async function () {
    await prepare(this, ["ERC20Mock", "UniswapV2Factory", "UniswapV2Router02", "UniswapV2Pair"])
  })

  beforeEach(async function () {
    await deploy(this, [
      ["kanga", this.ERC20Mock, ["KANGA", "KANGA", getBigNumber("10000000")]],
      ["weth", this.ERC20Mock, ["WETH", "ETH", getBigNumber("10000000")]],
      ["factory", this.UniswapV2Factory, [this.alice.address]],
    ])
    await deploy(this, [["router", this.UniswapV2Router02, [this.factory.address, this.weth.address]]])
    await this.factory.setFeeTo("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8")

  })
  describe("check Reserves and Oracles", function () {
    it ("checks reserves and TWAP ", async function () {

      // block 10 - create KLP
      await advanceBlockTo(10)
      await createKLP(this, "kangaEth", this.kanga, this.weth, getBigNumber(10))
      let blockTimestamp10 = await getBlockTimestamp(10)
      console.log(`Block  10 Timestamp: ${blockTimestamp10}`)
      let kangaEthReserves10 = await this.kangaEth.getReserves();
      console.log(`Block  10 Reserves : ${kangaEthReserves10}`)
      let price0CumulativeLast10 = await this.kangaEth.price0CumulativeLast();
      console.log(`Block  10 price0CumulativeLast : ${price0CumulativeLast10}`)
      let price1CumulativeLast10 = await this.kangaEth.price1CumulativeLast();
      console.log(`Block  10 price1CumulativeLast : ${price1CumulativeLast10}`)
      // get balance of liquidity provider
      let lp_balance = await this.kangaEth.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      console.log(`lp_balance: ${lp_balance}`)
      // get balance of fee_to recipient
      let fee_to_balance = await this.kangaEth.balanceOf("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8") 
      console.log(`fee_to_balance: ${fee_to_balance}`)
      let lp_ratio = lp_balance/fee_to_balance
      // block 20 - add KLP
      await advanceBlockTo(20)
      await this.kanga.connect(this.alice).approve(this.router.address, getBigNumber(20))
      await this.weth.connect(this.alice).approve(this.router.address, getBigNumber(20))
      await addLiquidityKLP(this, this.kanga, this.weth, getBigNumber(20), getBigNumber(20), getBigNumber(20), getBigNumber(20), this.alice.address)
      let blockTimestamp20 = await getBlockTimestamp(20)
      console.log(`Block  20 Timestamp: ${blockTimestamp20}`)
      let kangaEthReserves20 = await this.kangaEth.getReserves();
      console.log(`Block  20 Reserves : ${kangaEthReserves20}`)
      let price0CumulativeLast20 = await this.kangaEth.price0CumulativeLast();
      console.log(`Block  20 price0CumulativeLast : ${price0CumulativeLast20}`)
      let price1CumulativeLast20 = await this.kangaEth.price1CumulativeLast();
      console.log(`Block  20 price1CumulativeLast : ${price1CumulativeLast20}`)
      // get balance of liquidity provider
      lp_balance = await this.kangaEth.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      console.log(`lp_balance: ${lp_balance}`)
      // get balance of fee_to recipient
      fee_to_balance = await this.kangaEth.balanceOf("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8") 
      console.log(`fee_to_balance: ${fee_to_balance}`)
      // block 30 - add KLP
      await advanceBlockTo(30)
      await this.kanga.connect(this.alice).approve(this.router.address, getBigNumber(30))
      await this.weth.connect(this.alice).approve(this.router.address, getBigNumber(30))
      await addLiquidityKLP(this, this.kanga, this.weth, getBigNumber(20), getBigNumber(30), getBigNumber(20), getBigNumber(20), this.alice.address)
      let blockTimestamp30 = await getBlockTimestamp(30)
      console.log(`Block  30 Timestamp: ${blockTimestamp30}`)
      let kangaEthReserves30 = await this.kangaEth.getReserves();
      console.log(`Block  30 Reserves : ${kangaEthReserves30}`)
      let price0CumulativeLast30 = await this.kangaEth.price0CumulativeLast();
      console.log(`Block  30 price0CumulativeLast : ${price0CumulativeLast30}`)
      let price1CumulativeLast30 = await this.kangaEth.price1CumulativeLast();
      console.log(`Block  30 price1CumulativeLast : ${price1CumulativeLast30}`)
      // get balance of liquidity provider
      lp_balance = await this.kangaEth.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      console.log(`lp_balance: ${lp_balance}`)
      // get balance of fee_to recipient
      fee_to_balance = await this.kangaEth.balanceOf("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8") 
      console.log(`fee_to_balance: ${fee_to_balance}`)
      // block 40 - remove KLP


    })
  })
})
