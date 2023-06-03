import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, utils } from "hardhat";
import { Aggregator, WETH, ERC20 } from "../typechain-types";

const WETH_MAINNET_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const AAVE_A_WETH_MAINNET_ADDRESS = "0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8";

describe("Aggreegator", function () {
  let aggregator: Aggregator;
  let vitalik: ethers.Signer;
  let weth: WETH;
  let aaveAweth: ERC20;

  enum Market {
    AAVE = 0,
    COMPOUND = 1
  }

  enum Protocol{
    AAVE = 0,
    COMPOUND = 1,
    NONE = 2
  }

  async function depositAndCheck(market: Market, amount: BigInt) {
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.NONE);
    await weth.deposit({value: amount});
    await weth.approve(aggregator.address, amount);
    await expect(aggregator.deposit(market, amount))
      .to.emit(aggregator, "Deposit")
      .withArgs(market, amount);
    expect(await aaveAweth.balanceOf(aggregator.address)).to.eq(amount);
  }

  beforeEach(async () => {
    vitalik = await ethers.getImpersonatedSigner("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
    const Aggregator = await ethers.getContractFactory("Aggregator", vitalik);
    aggregator = await Aggregator.deploy();
    weth = await ethers.getContractAt('WETH', WETH_MAINNET_ADDRESS, vitalik);
    aaveAweth = await ethers.getContractAt('ERC20', AAVE_A_WETH_MAINNET_ADDRESS);
  });

  it('should not let to make a deposit to anyone other than owner', async () => {
    const imposter = await ethers.getImpersonatedSigner(ethers.utils.hexZeroPad("0x1", 20));
    await expect(aggregator.connect(imposter).deposit(Market.AAVE, 3n * 10n ** 18n))
      .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it('should not let to make a deposit twice', async () => {
    await depositAndCheck(Market.AAVE, 3n * 10n ** 18n)
    const amount = 1n * 10n ** 18n;
    await weth.deposit({value: amount});
    await weth.approve(aggregator.address, amount);
    await expect(aggregator.deposit(Market.AAVE, amount))
      .to.be.revertedWith("You should withdraw before re-deposit");
  });

  it("should deposit weth to aave", async () => {
    await depositAndCheck(Market.AAVE, 3n * 10n ** 18n)
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.AAVE);
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

