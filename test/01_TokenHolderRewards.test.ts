import { expect } from "chai";
import { prepare, deploy, getBigNumber, createKLP, addLiquidityKLP, removeLiquidityKLP, advanceBlock, advanceBlockTo } from "./utilities"
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
      ["dai", this.ERC20Mock, ["DAI", "DAI", getBigNumber("10000000")]],
      ["mic", this.ERC20Mock, ["MIC", "MIC", getBigNumber("10000000")]],
      ["usdc", this.ERC20Mock, ["USDC", "USDC", getBigNumber("10000000")]],
      ["weth", this.ERC20Mock, ["WETH", "ETH", getBigNumber("10000000")]],
      ["strudel", this.ERC20Mock, ["$TRDL", "$TRDL", getBigNumber("10000000")]],
      ["factory", this.UniswapV2Factory, [this.alice.address]],
    ])
    await deploy(this, [["router", this.UniswapV2Router02, [this.factory.address, this.weth.address]]])
    await this.factory.setFeeTo("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8")

  })
  describe("check Token Holder Rewards", function () {
    it ("checks initial fee to and setter are set", async function () {

      // Check the FeeTo and fee to Setter
      let fee_to_setter = await this.factory.feeToSetter()
      expect(fee_to_setter).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      let fee_to = await this.factory.feeTo()
      expect(fee_to).to.equal("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8")
      let migrator = await this.factory.migrator()
      expect(migrator).to.equal("0x0000000000000000000000000000000000000000")
      console.log(`fee_to_setter(alice) : ${fee_to_setter}`)
      console.log(`fee_to(fee_recipient): ${fee_to}`)
      console.log(`migrator(null): ${migrator}`)
    })
    // it ("checks we have set fee to", async function () {
    //   // set fee_to
    //   await this.factory.setFeeTo("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8")
    //   // Check the FeeTo is now set
    //   let fee_too = await this.factory.feeTo()
    //   expect(fee_too).to.equal("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8")
    // })
    it ("check that fee_to recipient is updated on mint", async function () {
      // create a Liquidity Pool
      await createKLP(this, "kangaEth", this.kanga, this.weth, getBigNumber(10))
      // get balance of liquidity provider
      let lp_balance = await this.kangaEth.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      console.log(`lp_balance: ${lp_balance}`)
      // get balance of fee_to recipient
      let fee_to_balance = await this.kangaEth.balanceOf("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8") 
      console.log(`fee_to_balance: ${fee_to_balance}`)
      let lp_ratio = lp_balance/fee_to_balance
      expect (lp_ratio).to.equal(5)
      // expect (lp_balance*0).to.equal(fee_to_balance*5)
    })
    it ("check that fee_to recipient is updated when adding liquidity", async function () {
      // create a Liquidity Pool
      console.log(`create Liqudity Pool`)
      await advanceBlock()
      await createKLP(this, "kangaEth", this.kanga, this.weth, "1000000000000000000")
      console.log(`KangaEthPairAddress: ${await this.kangaEth.address}`)
      //await this.kangaEth.sync()
      // add liquidity 
      console.log(`add Liquidity 1st time`)
      await advanceBlockTo(10)
      await this.kanga.connect(this.alice).approve(this.router.address, "6000000000000000000")
      await this.weth.connect(this.alice).approve(this.router.address, "6000000000000000000")
      await addLiquidityKLP(this, this.kanga, this.weth, "6000000000000000000", "6000000000000000000", "60000000000000000000", "6000000000000000000", this.alice.address)
      // await this.kangaEth.sync()
      // add liquidity 
      console.log(`add Liquidity 2nd time`)
      await advanceBlockTo(20)
      await this.kanga.connect(this.alice).approve(this.router.address, "6000000000000000000")
      await this.weth.connect(this.alice).approve(this.router.address, "6000000000000000000")
      await addLiquidityKLP(this, this.kanga, this.weth, "6000000000000000000", "6000000000000000000", "60000000000000000000", "6000000000000000000", this.alice.address)
      // await this.kangaEth.sync()
     // remove liquidity 
     console.log(`remove Liquidity 1st time`)
     await advanceBlockTo(20)
    //  await this.kangaEth.connect(this.alice).approve(this.router.address, "6000000000000000000")
    //  await removeLiquidityKLP(this, this.kanga, this.weth, "60000000000000000000", "6000000000000000000", "6000000000000000000", this.alice.address)
    //  await this.kangaEth.sync()
      // get balance of liquidity provider
      let lp_balance = await this.kangaEth.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      console.log(`lp_balance: ${lp_balance}`)
      // get balance of fee_to recipient
      let fee_to_balance = await this.kangaEth.balanceOf("0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8") 
      console.log(`fee_to_balance: ${fee_to_balance}`)
      let lp_ratio = lp_balance/fee_to_balance
      expect (lp_ratio).to.equal(5)
      // expect (lp_balance*0).to.equal(fee_to_balance*5)
    })
  })
})
