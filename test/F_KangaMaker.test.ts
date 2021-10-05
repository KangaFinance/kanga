import { expect } from "chai";
import { prepare, deploy, getBigNumber, createKLP } from "./utilities"

describe("KangaMaker", function () {
  before(async function () {
    await prepare(this, ["KangaMaker", "Billabong", "KangaMakerExploitMock", "ERC20Mock", "UniswapV2Factory", "UniswapV2Pair"])
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
    await deploy(this, [["billabong", this.Billabong, [this.kanga.address]]])
    await deploy(this, [["kangaMaker", this.KangaMaker, [this.factory.address, this.billabong.address, this.kanga.address, this.weth.address]]])
    await deploy(this, [["exploiter", this.KangaMakerExploitMock, [this.kangaMaker.address]]])
    await createKLP(this, "kangaEth", this.kanga, this.weth, getBigNumber(10))
    await createKLP(this, "strudelEth", this.strudel, this.weth, getBigNumber(10))
    await createKLP(this, "daiEth", this.dai, this.weth, getBigNumber(10))
    await createKLP(this, "usdcEth", this.usdc, this.weth, getBigNumber(10))
    await createKLP(this, "micUSDC", this.mic, this.usdc, getBigNumber(10))
    await createKLP(this, "kangaUSDC", this.kanga, this.usdc, getBigNumber(10))
    await createKLP(this, "daiUSDC", this.dai, this.usdc, getBigNumber(10))
    await createKLP(this, "daiMIC", this.dai, this.mic, getBigNumber(10))
  })
  describe("checkKLP", function () {
    it("checks LP tokens have KLP symbol and name", async function () {
      expect(await this.kangaEth.symbol()).to.equal("KLP")
      expect(await this.kangaEth.name()).to.equal("Kanga LP Token")
      const kanga_eth_symbol = await this.kangaEth.symbol()
      console.log(`kanga_eth_symbol: ${JSON.stringify(kanga_eth_symbol)}`) 
    }) 
  })
  describe("setBridge", function () {
    it("does not allow to set bridge for Kanga", async function () {
      await expect(this.kangaMaker.setBridge(this.kanga.address, this.weth.address)).to.be.revertedWith("KangaMaker: Invalid bridge")
    })

    it("does not allow to set bridge for WETH", async function () {
      await expect(this.kangaMaker.setBridge(this.weth.address, this.kanga.address)).to.be.revertedWith("KangaMaker: Invalid bridge")
    })

    it("does not allow to set bridge to itself", async function () {
      await expect(this.kangaMaker.setBridge(this.dai.address, this.dai.address)).to.be.revertedWith("KangaMaker: Invalid bridge")
    })

    it("emits correct event on bridge", async function () {
      await expect(this.kangaMaker.setBridge(this.dai.address, this.kanga.address))
        .to.emit(this.kangaMaker, "LogBridgeSet")
        .withArgs(this.dai.address, this.kanga.address)
    })
  })
  describe("convert", function () {
    it("should convert KANGA - ETH", async function () {
      await this.kangaEth.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.convert(this.kanga.address, this.weth.address)
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kangaEth.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("1897569270781234370")
    })

    it("should convert USDC - ETH", async function () {
      await this.usdcEth.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.convert(this.usdc.address, this.weth.address)
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.usdcEth.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("1590898251382934275")
    })

    it("should convert $TRDL - ETH", async function () {
      await this.strudelEth.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.convert(this.strudel.address, this.weth.address)
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.strudelEth.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("1590898251382934275")
    })

    it("should convert USDC - KANGA", async function () {
      await this.kangaUSDC.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.convert(this.usdc.address, this.kanga.address)
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kangaUSDC.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("1897569270781234370")
    })

    it("should convert using standard ETH path", async function () {
      await this.daiEth.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.convert(this.dai.address, this.weth.address)
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.daiEth.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("1590898251382934275")
    })

    it("converts MIC/USDC using more complex path", async function () {
      await this.micUSDC.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.setBridge(this.usdc.address, this.kanga.address)
      await this.kangaMaker.setBridge(this.mic.address, this.usdc.address)
      await this.kangaMaker.convert(this.mic.address, this.usdc.address)
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.micUSDC.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("1590898251382934275")
    })

    it("converts DAI/USDC using more complex path", async function () {
      await this.daiUSDC.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.setBridge(this.usdc.address, this.kanga.address)
      await this.kangaMaker.setBridge(this.dai.address, this.usdc.address)
      await this.kangaMaker.convert(this.dai.address, this.usdc.address)
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.daiUSDC.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("1590898251382934275")
    })

    it("converts DAI/MIC using two step path", async function () {
      await this.daiMIC.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.setBridge(this.dai.address, this.usdc.address)
      await this.kangaMaker.setBridge(this.mic.address, this.dai.address)
      await this.kangaMaker.convert(this.dai.address, this.mic.address)
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.daiMIC.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("1200963016721363748")
    })

    it("reverts if it loops back", async function () {
      await this.daiMIC.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.setBridge(this.dai.address, this.mic.address)
      await this.kangaMaker.setBridge(this.mic.address, this.dai.address)
      await expect(this.kangaMaker.convert(this.dai.address, this.mic.address)).to.be.reverted
    })

    it("reverts if caller is not EOA", async function () {
      await this.kangaEth.transfer(this.kangaMaker.address, getBigNumber(1))
      await expect(this.exploiter.convert(this.kanga.address, this.weth.address)).to.be.revertedWith("KangaMaker: must use EOA")
    })

    it("reverts if pair does not exist", async function () {
      await expect(this.kangaMaker.convert(this.mic.address, this.micUSDC.address)).to.be.revertedWith("KangaMaker: Invalid pair")
    })

    it("reverts if no path is available", async function () {
      await this.micUSDC.transfer(this.kangaMaker.address, getBigNumber(1))
      await expect(this.kangaMaker.convert(this.mic.address, this.usdc.address)).to.be.revertedWith("KangaMaker: Cannot convert")
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.micUSDC.balanceOf(this.kangaMaker.address)).to.equal(getBigNumber(1))
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal(0)
    })
  })

  describe("convertMultiple", function () {
    it("should allow to convert multiple", async function () {
      await this.daiEth.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaEth.transfer(this.kangaMaker.address, getBigNumber(1))
      await this.kangaMaker.convertMultiple([this.dai.address, this.kanga.address], [this.weth.address, this.weth.address])
      expect(await this.kanga.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.daiEth.balanceOf(this.kangaMaker.address)).to.equal(0)
      expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("3186583558687783097")
    })
  })
})
