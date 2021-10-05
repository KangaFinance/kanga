import { expect } from "chai";
import { prepare, deploy, getBigNumber, createKLP, addLiquidityKLP } from "./utilities"

describe("KangaMaker", function () {
  before(async function () {
    await prepare(this, ["KangaMaker", "Billabong", "KangaMakerExploitMock", "ERC20Mock", "UniswapV2Factory", "UniswapV2Pair", "UniswapV2Router02","UniswapV2Pair"])
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
      ["uniswapPair", this.UniswapV2Pair, []],
    ])
    await deploy(this, [["router", this.UniswapV2Router02, [this.factory.address, this.weth.address]]]),
    await deploy(this, [["billabong", this.Billabong, [this.kanga.address]]])
    await deploy(this, [["kangaMaker", this.KangaMaker, [this.factory.address, this.billabong.address, this.kanga.address, this.weth.address]]])
    await deploy(this, [["exploiter", this.KangaMakerExploitMock, [this.kangaMaker.address]]])
    await createKLP(this, "kangaEth", this.kanga, this.weth, getBigNumber(10))

  })
  describe("checkKLP", function () {
    it("checks LP tokens have KLP symbol and name", async function () {
      expect(await this.kangaEth.symbol()).to.equal("KLP")
      expect(await this.kangaEth.name()).to.equal("Kanga LP Token")
      const kanga_eth_symbol = await this.kangaEth.symbol()
    }) 
  })
})
