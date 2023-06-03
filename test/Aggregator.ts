import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, utils } from "hardhat";


describe("Aggreegator", function () {
  let aggregator: Aggregator;

  beforeEach(async () => {
    const Aggregator = await ethers.getContractFactory("Aggregator");
    aggregator = await Aggregator.deploy();
  });

  it("should deposit weth", async () => {
    const amount = 123;
    await expect(aggregator.deposit(amount)).to.emit(aggregator, "Deposit");
  });

  it("should withdraw weth", async () => {
    await expect(aggregator.withdraw())
      .to.emit(aggregator, "Withdrawal")
      .withArgs(123);
  });

  it("should rebalance", async () => {
    await expect(aggregator.rebalance())
      .to.emit(aggregator, "Rebalance")
      .withArgs(ethers.utils.hexZeroPad("0x1", 20), ethers.utils.hexZeroPad("0x2", 20));
  });
});

