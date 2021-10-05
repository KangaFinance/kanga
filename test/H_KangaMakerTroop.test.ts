import { ethers } from "hardhat";
const { keccak256, defaultAbiCoder } = require("ethers");
import { expect } from "chai";
import { prepare, deploy, getBigNumber, createKLP } from "./utilities"

describe("TroopKangaMaker", function () {
  before(async function () {
    await prepare(this, ["KangaMakerTroop", "Billabong", "KangaMakerTroopExploitMock", "ERC20Mock", "UniswapV2Factory", "UniswapV2Pair", "KangaMobV1", "TroopPairMediumRiskV1", "PeggedOracleV1"])
  })

  beforeEach(async function () {
    // Deploy ERC20 Mocks and Factory
    await deploy(this, [
      ["kanga", this.ERC20Mock, ["KANGA", "KANGA", getBigNumber("10000000")]],
      ["dai", this.ERC20Mock, ["DAI", "DAI", getBigNumber("10000000")]],
      ["mic", this.ERC20Mock, ["MIC", "MIC", getBigNumber("10000000")]],
      ["usdc", this.ERC20Mock, ["USDC", "USDC", getBigNumber("10000000")]],
      ["weth", this.ERC20Mock, ["WETH", "ETH", getBigNumber("10000000")]],
      ["strudel", this.ERC20Mock, ["$TRDL", "$TRDL", getBigNumber("10000000")]],
      ["factory", this.UniswapV2Factory, [this.alice.address]],
    ])
    // Deploy Kanga and Troop contracts
    await deploy(this, [["billabong", this.Billabong, [this.kanga.address]]])
    await deploy(this, [["mob", this.KangaMobV1, [this.weth.address]]])
    await deploy(this, [["troopMaster", this.TroopPairMediumRiskV1, [this.mob.address]]])
    await deploy(this, [["troopMaker", this.KangaMakerTroop, [this.factory.address, this.billabong.address, this.mob.address, this.kanga.address, this.weth.address, this.factory.pairCodeHash()]]])
    await deploy(this, [["exploiter", this.KangaMakerTroopExploitMock, [this.troopMaker.address]]])
    await deploy(this, [["oracle", this.PeggedOracleV1]])
    // Create KLPs
    await createKLP(this, "kangaEth", this.kanga, this.weth, getBigNumber(10))
    await createKLP(this, "strudelEth", this.strudel, this.weth, getBigNumber(10))
    await createKLP(this, "daiEth", this.dai, this.weth, getBigNumber(10))
    await createKLP(this, "usdcEth", this.usdc, this.weth, getBigNumber(10))
    await createKLP(this, "micUSDC", this.mic, this.usdc, getBigNumber(10))
    await createKLP(this, "kangaUSDC", this.kanga, this.usdc, getBigNumber(10))
    await createKLP(this, "daiUSDC", this.dai, this.usdc, getBigNumber(10))
    await createKLP(this, "daiMIC", this.dai, this.mic, getBigNumber(10))
    // Set Troop fees to Maker
    await this.troopMaster.setFeeTo(this.troopMaker.address)
    // Whitelist Troop on Mob
    await this.mob.whitelistMasterContract(this.troopMaster.address, true)
    // Approve and make Mob token deposits
    await this.kanga.approve(this.mob.address, getBigNumber(10))
    await this.dai.approve(this.mob.address, getBigNumber(10))
    await this.mic.approve(this.mob.address, getBigNumber(10))
    await this.usdc.approve(this.mob.address, getBigNumber(10))
    await this.weth.approve(this.mob.address, getBigNumber(10))
    await this.strudel.approve(this.mob.address, getBigNumber(10))
    await this.mob.deposit(this.kanga.address, this.alice.address, this.alice.address, getBigNumber(10), 0)
    await this.mob.deposit(this.dai.address, this.alice.address, this.alice.address, getBigNumber(10), 0)
    await this.mob.deposit(this.mic.address, this.alice.address, this.alice.address, getBigNumber(10), 0)
    await this.mob.deposit(this.usdc.address, this.alice.address, this.alice.address, getBigNumber(10), 0)
    await this.mob.deposit(this.weth.address, this.alice.address, this.alice.address, getBigNumber(10), 0)
    await this.mob.deposit(this.strudel.address, this.alice.address, this.alice.address, getBigNumber(10), 0)
    // Approve Troop to spend 'alice' Mob tokens
    await this.mob.setMasterContractApproval(this.alice.address, this.troopMaster.address, true, "0", "0x0000000000000000000000000000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000000000000000000000000000")
    // **TO-DO - Initialize Troop Pair**
    //const oracleData = await this.oracle.getDataParameter("1")
    //const initData = defaultAbiCoder.encode(["address", "address", "address", "bytes"], [this.kanga.address, this.dai.address, this.oracle.address, oracleData])
    //await this.mob.deploy(this.TroopMaster.address, initData, true)
  })

  describe("setBridge", function () {
    it("only allows the owner to set bridge", async function () {
      await expect(this.troopMaker.connect(this.bob).setBridge(this.kanga.address, this.weth.address, { from: this.bob.address })).to.be.revertedWith("Ownable: caller is not the owner")
    })
    
    it("does not allow to set bridge for Kanga", async function () {
      await expect(this.troopMaker.setBridge(this.kanga.address, this.weth.address)).to.be.revertedWith("Maker: Invalid bridge")
    })

    it("does not allow to set bridge for WETH", async function () {
      await expect(this.troopMaker.setBridge(this.weth.address, this.kanga.address)).to.be.revertedWith("Maker: Invalid bridge")
    })

    it("does not allow to set bridge to itself", async function () {
      await expect(this.troopMaker.setBridge(this.dai.address, this.dai.address)).to.be.revertedWith("Maker: Invalid bridge")
    })

    it("emits correct event on bridge", async function () {
      await expect(this.troopMaker.setBridge(this.dai.address, this.kanga.address))
        .to.emit(this.troopMaker, "LogBridgeSet")
        .withArgs(this.dai.address, this.kanga.address)
    })
  })
  
  describe("convert", function () {
    it("reverts if caller is not EOA", async function () {
      await expect(this.exploiter.convert(this.kanga.address)).to.be.revertedWith("Maker: Must use EOA")
    })
  })
})
