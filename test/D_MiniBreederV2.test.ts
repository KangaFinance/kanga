import { expect, assert } from "chai";
import { advanceTime, advanceTimeAndBlock, advanceBlockTo, advanceBlock, prepare, deploy, getBigNumber, ADDRESS_ZERO } from "./utilities"
const { BigNumber } = require("ethers")
import {ethers} from "hardhat"

describe("MiniBreederV2", function () {
  before(async function () {
    await prepare(this, ['MiniBreederV2', 'KangaToken', 'ERC20Mock', 'RewarderMock', 'RewarderBrokenMock'])
    await deploy(this, [
      ["brokenRewarder", this.RewarderBrokenMock]
    ])
  })

  beforeEach(async function () {
    await deploy(this, [
      ["kanga", this.KangaToken],
    ])

    await deploy(this,
      [["lp", this.ERC20Mock, ["LP Token", "LPT", getBigNumber(10)]],
      ["dummy", this.ERC20Mock, ["Dummy", "DummyT", getBigNumber(10)]],
      ['breeder', this.MiniBreederV2, [this.kanga.address]],
      ["rlp", this.ERC20Mock, ["LP", "rLPT", getBigNumber(10)]],
      ["r", this.ERC20Mock, ["Reward", "RewardT", getBigNumber(100000)]],
    ])
    await deploy(this, [["rewarder", this.RewarderMock, [getBigNumber(1), this.r.address, this.breeder.address]]])

    await this.kanga.mint(this.breeder.address, getBigNumber(10000))
    await this.lp.approve(this.breeder.address, getBigNumber(10))
    await this.breeder.setKangaPerSecond("10000000000000000")
    await this.rlp.transfer(this.bob.address, getBigNumber(1))
  })

  describe("PoolLength", function () {
    it("PoolLength should execute", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      expect((await this.breeder.poolLength())).to.be.equal(1);
    })
  })

  describe("Set", function() {
    it("Should emit event LogSetPool", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await expect(this.breeder.set(0, 10, this.dummy.address, false))
            .to.emit(this.breeder, "LogSetPool")
            .withArgs(0, 10, this.rewarder.address, false)
      await expect(this.breeder.set(0, 10, this.dummy.address, true))
            .to.emit(this.breeder, "LogSetPool")
            .withArgs(0, 10, this.dummy.address, true)
      })

    it("Should revert if invalid pool", async function () {
      let err;
      try {
        await this.breeder.set(0, 10, this.rewarder.address, false)
      } catch (e) {
        err = e;
      }

      assert.equal(err.toString(), "Error: VM Exception while processing transaction: invalid opcode")
    })
  })

  describe("PendingKanga", function() {
    it("PendingKanga should equal ExpectedKanga", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await this.rlp.approve(this.breeder.address, getBigNumber(10))
      let log = await this.breeder.deposit(0, getBigNumber(1), this.alice.address)
      await advanceTime(86400)
      let log2 = await this.breeder.updatePool(0)
      let timestamp2 = (await ethers.provider.getBlock(log2.blockNumber)).timestamp
      let timestamp = (await ethers.provider.getBlock(log.blockNumber)).timestamp
      let expectedKanga = BigNumber.from("10000000000000000").mul(timestamp2 - timestamp)
      let pendingKanga = await this.breeder.pendingKanga(0, this.alice.address)
      expect(pendingKanga).to.be.equal(expectedKanga)
    })
    it("When time is lastRewardTime", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await this.rlp.approve(this.breeder.address, getBigNumber(10))
      let log = await this.breeder.deposit(0, getBigNumber(1), this.alice.address)
      await advanceBlockTo(3)
      let log2 = await this.breeder.updatePool(0)
      let timestamp2 = (await ethers.provider.getBlock(log2.blockNumber)).timestamp
      let timestamp = (await ethers.provider.getBlock(log.blockNumber)).timestamp
      let expectedKanga = BigNumber.from("10000000000000000").mul(timestamp2 - timestamp)
      let pendingKanga = await this.breeder.pendingKanga(0, this.alice.address)
      expect(pendingKanga).to.be.equal(expectedKanga)
    })
  })

  describe("MassUpdatePools", function () {
    it("Should call updatePool", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await advanceBlockTo(1)
      await this.breeder.massUpdatePools([0])
      //expect('updatePool').to.be.calledOnContract(); //not suported by heardhat
      //expect('updatePool').to.be.calledOnContractWith(0); //not suported by heardhat

    })

    it("Updating invalid pools should fail", async function () {
      let err;
      try {
        await this.breeder.massUpdatePools([0, 10000, 100000])
      } catch (e) {
        err = e;
      }

      assert.equal(err.toString(), "Error: VM Exception while processing transaction: invalid opcode")
    })
})

  describe("Add", function () {
    it("Should add pool with reward token multiplier", async function () {
      await expect(this.breeder.add(10, this.rlp.address, this.rewarder.address))
            .to.emit(this.breeder, "LogPoolAddition")
            .withArgs(0, 10, this.rlp.address, this.rewarder.address)
      })
  })

  describe("UpdatePool", function () {
    it("Should emit event LogUpdatePool", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await advanceBlockTo(1)
      await expect(this.breeder.updatePool(0))
            .to.emit(this.breeder, "LogUpdatePool")
            .withArgs(0, (await this.breeder.poolInfo(0)).lastRewardTime,
              (await this.rlp.balanceOf(this.breeder.address)),
              (await this.breeder.poolInfo(0)).accKangaPerShare)
    })

    it("Should take else path", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await advanceBlockTo(1)
      await this.breeder.batch(
          [
              this.breeder.interface.encodeFunctionData("updatePool", [0]),
              this.breeder.interface.encodeFunctionData("updatePool", [0]),
          ],
          true
      )
    })
  })

  describe("Deposit", function () {
    it("Depositing 0 amount", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await this.rlp.approve(this.breeder.address, getBigNumber(10))
      await expect(this.breeder.deposit(0, getBigNumber(0), this.alice.address))
            .to.emit(this.breeder, "Deposit")
            .withArgs(this.alice.address, 0, 0, this.alice.address)
    })

    it("Depositing into non-existent pool should fail", async function () {
      let err;
      try {
        await this.breeder.deposit(1001, getBigNumber(0), this.alice.address)
      } catch (e) {
        err = e;
      }

      assert.equal(err.toString(), "Error: VM Exception while processing transaction: invalid opcode")
    })
  })

  describe("Withdraw", function () {
    it("Withdraw 0 amount", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await expect(this.breeder.withdraw(0, getBigNumber(0), this.alice.address))
            .to.emit(this.breeder, "Withdraw")
            .withArgs(this.alice.address, 0, 0, this.alice.address)
    })
  })

  describe("Harvest", function () {
    it("Should give back the correct amount of KANGA and reward", async function () {
        await this.r.transfer(this.rewarder.address, getBigNumber(100000))
        await this.breeder.add(10, this.rlp.address, this.rewarder.address)
        await this.rlp.approve(this.breeder.address, getBigNumber(10))
        expect(await this.breeder.lpToken(0)).to.be.equal(this.rlp.address)
        let log = await this.breeder.deposit(0, getBigNumber(1), this.alice.address)
        await advanceTime(86400)
        let log2 = await this.breeder.withdraw(0, getBigNumber(1), this.alice.address)
        let timestamp2 = (await ethers.provider.getBlock(log2.blockNumber)).timestamp
        let timestamp = (await ethers.provider.getBlock(log.blockNumber)).timestamp
        let expectedKanga = BigNumber.from("10000000000000000").mul(timestamp2 - timestamp)
        expect((await this.breeder.userInfo(0, this.alice.address)).rewardDebt).to.be.equal("-"+expectedKanga)
        await this.breeder.harvest(0, this.alice.address)
        expect(await this.kanga.balanceOf(this.alice.address)).to.be.equal(await this.r.balanceOf(this.alice.address)).to.be.equal(expectedKanga)
    })
    it("Harvest with empty user balance", async function () {
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await this.breeder.harvest(0, this.alice.address)
    })

    it("Harvest for KANGA-only pool", async function () {
      await this.breeder.add(10, this.rlp.address, ADDRESS_ZERO)
      await this.rlp.approve(this.breeder.address, getBigNumber(10))
      expect(await this.breeder.lpToken(0)).to.be.equal(this.rlp.address)
      let log = await this.breeder.deposit(0, getBigNumber(1), this.alice.address)
      await advanceBlock()
      let log2 = await this.breeder.withdraw(0, getBigNumber(1), this.alice.address)
      let timestamp2 = (await ethers.provider.getBlock(log2.blockNumber)).timestamp
      let timestamp = (await ethers.provider.getBlock(log.blockNumber)).timestamp
      let expectedKanga = BigNumber.from("10000000000000000").mul(timestamp2 - timestamp)
      expect((await this.breeder.userInfo(0, this.alice.address)).rewardDebt).to.be.equal("-"+expectedKanga)
      await this.breeder.harvest(0, this.alice.address)
      expect(await this.kanga.balanceOf(this.alice.address)).to.be.equal(expectedKanga)
    })
  })

  describe("EmergencyWithdraw", function() {
    it("Should emit event EmergencyWithdraw", async function () {
      await this.r.transfer(this.rewarder.address, getBigNumber(100000))
      await this.breeder.add(10, this.rlp.address, this.rewarder.address)
      await this.rlp.approve(this.breeder.address, getBigNumber(10))
      await this.breeder.deposit(0, getBigNumber(1), this.bob.address)
      //await this.breeder.emergencyWithdraw(0, this.alice.address)
      await expect(this.breeder.connect(this.bob).emergencyWithdraw(0, this.bob.address))
      .to.emit(this.breeder, "EmergencyWithdraw")
      .withArgs(this.bob.address, 0, getBigNumber(1), this.bob.address)
    })
  })
})
