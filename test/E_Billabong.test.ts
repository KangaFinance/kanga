import { ethers } from "hardhat";
import { expect } from "chai";

describe("Billabong", function () {
  before(async function () {
    this.KangaToken = await ethers.getContractFactory("KangaToken")
    this.Billabong = await ethers.getContractFactory("Billabong")

    this.signers = await ethers.getSigners()
    this.alice = this.signers[0]
    this.bob = this.signers[1]
    this.carol = this.signers[2]
  })

  beforeEach(async function () {
    this.kanga = await this.KangaToken.deploy()
    this.billabong = await this.Billabong.deploy(this.kanga.address)
    this.kanga.mint(this.alice.address, "100")
    this.kanga.mint(this.bob.address, "100")
    this.kanga.mint(this.carol.address, "100")
  })

  it("should not allow enter if not enough approve", async function () {
    await expect(this.billabong.enter("100")).to.be.revertedWith("ERC20: transfer amount exceeds allowance")
    await this.kanga.approve(this.billabong.address, "50")
    await expect(this.billabong.enter("100")).to.be.revertedWith("ERC20: transfer amount exceeds allowance")
    await this.kanga.approve(this.billabong.address, "100")
    await this.billabong.enter("100")
    expect(await this.billabong.balanceOf(this.alice.address)).to.equal("100")
  })

  it("should not allow withraw more than what you have", async function () {
    await this.kanga.approve(this.billabong.address, "100")
    await this.billabong.enter("100")
    await expect(this.billabong.leave("200")).to.be.revertedWith("ERC20: burn amount exceeds balance")
  })

  it("should work with more than one participant", async function () {
    await this.kanga.approve(this.billabong.address, "100")
    await this.kanga.connect(this.bob).approve(this.billabong.address, "100", { from: this.bob.address })
    // Alice enters and gets 20 shares. Bob enters and gets 10 shares.
    await this.billabong.enter("20")
    await this.billabong.connect(this.bob).enter("10", { from: this.bob.address })
    expect(await this.billabong.balanceOf(this.alice.address)).to.equal("20")
    expect(await this.billabong.balanceOf(this.bob.address)).to.equal("10")
    expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("30")
    // Billabong get 20 more KANGAs from an external source.
    await this.kanga.connect(this.carol).transfer(this.billabong.address, "20", { from: this.carol.address })
    // Alice deposits 10 more KANGAs. She should receive 10*30/50 = 6 shares.
    await this.billabong.enter("10")
    expect(await this.billabong.balanceOf(this.alice.address)).to.equal("26")
    expect(await this.billabong.balanceOf(this.bob.address)).to.equal("10")
    // Bob withdraws 5 shares. He should receive 5*60/36 = 8 shares
    await this.billabong.connect(this.bob).leave("5", { from: this.bob.address })
    expect(await this.billabong.balanceOf(this.alice.address)).to.equal("26")
    expect(await this.billabong.balanceOf(this.bob.address)).to.equal("5")
    expect(await this.kanga.balanceOf(this.billabong.address)).to.equal("52")
    expect(await this.kanga.balanceOf(this.alice.address)).to.equal("70")
    expect(await this.kanga.balanceOf(this.bob.address)).to.equal("98")
  })
})
