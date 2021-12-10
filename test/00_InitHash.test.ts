import { expect } from "chai";
import { prepare, deploy, getBigNumber, createKLP, addLiquidityKLP } from "./utilities"
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
    await deploy(this, [["router", this.UniswapV2Router02, [this.factory.address, this.weth.address]]]),
    await createKLP(this, "kangaEth", this.kanga, this.weth, getBigNumber(10))
    // console.log (`Alices Kanga Balance: ${await this.kanga.balanceOf(this.alice.address)}`)
    // await createKLPRouter(this, "strudelEthRouter", this.strudel, this.usdc, getBigNumber(10), this.alice.address)

  })
  describe("checkInitHash", function () {
    it ("checks the Init Hash is correct", async function () {

      //This is the same code (with a "0x" prefix) used in uniswap/libraries/UniswapV2Library.sol getPair
      // https://ethereum.stackexchange.com/questions/88075/uniswap-addliquidity-function-transaction-revert
      const COMPUTED_INIT_CODE_HASH = await this.factory.INIT_CODE_PAIR_HASH()
      console.log(`MANUAL_INIT_CODE_HASH: ${MANUAL_INIT_CODE_HASH}`)
      console.log(`this.factory.INIT_CODE_PAIR_HASH(): ${await this.factory.INIT_CODE_PAIR_HASH()}`)
      expect(COMPUTED_INIT_CODE_HASH).to.equal(MANUAL_INIT_CODE_HASH)
    })
    // Currently there is a problem with INIT_CODE_HASH being different when calculated manually vs using the factory
    // Local testing works with the factory version
    // When deploying to harmony testnet it works with the manual version
    // Currently have updated UniswapV2Library.sol to use the manual version so we can deploy
    // This may be because of the way the hash is calcluated or the fact that when testing locally the compiled version is different from when deploying
    // TODO fix the discrepency, update the factory with a value that works for local testing and deployments and add the tests back in
    it ("check ability to add liquidity", async function () {
      // Check a pair created by the factory
      expect(await this.kangaEth.symbol()).to.equal("KLP")
      expect(await this.kangaEth.name()).to.equal("Kanga LP Token")
      // console.log(`this.kangaEth.address: ${this.kangaEth.address}`)
      // console.log(`this.kanga.address: ${this.kanga.address}`)
      // console.log(`this.weth.address: ${this.weth.address}`)
      // console.log(`this.alice.address: ${this.alice.address}`)

    await this.kanga.connect(this.alice).approve(this.router.address, "10000000000000000000")
    await this.weth.connect(this.alice).approve(this.router.address, "10000000000000000000")
    await addLiquidityKLP(this, this.kanga, this.weth, "6000000000000000000", "6000000000000000000", "60000000000000000000", "6000000000000000000", this.alice.address)
    console.log (`Alices Kanga Balance after addliquidity: ${await this.kanga.balanceOf(this.alice.address)}`)
    })
  })
})
