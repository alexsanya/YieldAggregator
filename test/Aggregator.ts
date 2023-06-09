import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, utils } from "hardhat";
import { Aggregator, WETH, ERC20, IComet } from "../typechain-types";
import { IPool } from "@aave/core-v3/contracts/interfaces";
import BigNumber from 'bignumber.js';

const WETH_MAINNET_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const AAVE_A_WETH_MAINNET_ADDRESS = "0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8";
const COMPOUND_V3_PROXY_MAINNET_ADDRESS = "0xA17581A9E3356d9A858b789D68B4d866e593aE94";

describe("Aggregator", function () {
  let aggregator: Aggregator;
  let vitalik: ethers.Signer;
  let imposter: ethers.Signer;
  let weth: WETH;
  let comet: IComet;
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

  async function deposit(market: Market, amount: BigInt) {
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.NONE);
    await weth.deposit({value: amount});
    await weth.approve(aggregator.address, amount);
    await expect(aggregator.deposit(market, amount))
      .to.emit(aggregator, "Deposit")
      .withArgs(market, amount);
  }

  beforeEach(async () => {
    vitalik = await ethers.getImpersonatedSigner("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
    imposter = await ethers.getImpersonatedSigner(ethers.utils.hexZeroPad("0x1", 20));
    const Aggregator = await ethers.getContractFactory("Aggregator", vitalik);
    aggregator = await Aggregator.deploy();
    weth = await ethers.getContractAt('WETH', WETH_MAINNET_ADDRESS, vitalik);
    comet = await ethers.getContractAt('IComet', COMPOUND_V3_PROXY_MAINNET_ADDRESS);
    aaveAweth = await ethers.getContractAt('ERC20', AAVE_A_WETH_MAINNET_ADDRESS);
  });

  it('should not let to make a deposit to anyone other than owner', async () => {
    await expect(aggregator.connect(imposter).deposit(Market.AAVE, 3n * 10n ** 18n))
      .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it('should not let to make a deposit twice', async () => {
    let amount = 3n * 10n ** 18n;
    await deposit(Market.AAVE, amount);
    expect(await aaveAweth.balanceOf(aggregator.address)).to.eq(amount);
    amount = 1n * 10n ** 18n;
    await weth.deposit({value: amount});
    await weth.approve(aggregator.address, amount);
    await expect(aggregator.deposit(Market.AAVE, amount))
      .to.be.revertedWith("You should withdraw before re-deposit");
  });

  it("should deposit weth to aave", async () => {
    const amount = 3n * 10n ** 18n;
    await deposit(Market.AAVE, amount);
    expect(await aggregator.getBalance()).to.eq(amount);
    expect(await aaveAweth.balanceOf(aggregator.address)).to.eq(amount);
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.AAVE);
  });

  it("should deposit weth to compound", async () => {
    const amount = 3n * 10n ** 18n;
    await deposit(Market.COMPOUND, amount);
    expect(await aggregator.getBalance()).to.eq(amount - 1n);
    expect(await comet.balanceOf(aggregator.address)).to.eq(amount - 1n);
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.COMPOUND);
  });

  it("should not let withdraw to anyone other than owner", async() => {
    await expect(aggregator.connect(imposter).withdraw())
      .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should let to withdraw before deposit", async () => {
    await expect(aggregator.withdraw())
      .to.be.revertedWith("Nothing to withdraw");
  });

  it("should withdraw from compound", async () => {
    const amount = 3n * 10n ** 18n;
    await deposit(Market.COMPOUND, amount);
    const wethBalanceBefore = await weth.balanceOf(vitalik.address);
    await expect(aggregator.withdraw())
      .to.emit(aggregator, "Withdrawal");
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.NONE);
    const wethBalanceAfter = await weth.balanceOf(vitalik.address);
    console.log(`Withdrawed from Compound ${wethBalanceAfter - wethBalanceBefore} WETH`);
  });

  it("should withdraw from aave", async () => {
    const amount = 3n * 10n ** 18n;
    await deposit(Market.AAVE, amount);
    const wethBalanceBefore = await weth.balanceOf(vitalik.address);
    await expect(aggregator.withdraw())
      .to.emit(aggregator, "Withdrawal");
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.NONE);
    const wethBalanceAfter = await weth.balanceOf(vitalik.address);
    console.log(`Withdrawed from AAVE ${wethBalanceAfter - wethBalanceBefore} WETH`);
  });

  it("should not let to rebalance to anyone other than owner", async () => {
    await expect(aggregator.connect(imposter).rebalance())
      .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should let to rebalance before deposit", async () => {
    await expect(aggregator.rebalance())
      .to.be.revertedWith("Nothing to rebalance");
  });

  it("should rebalance from aave to compound", async () => {
    const amount = 3n * 10n ** 18n;
    await deposit(Market.AAVE, amount);
    await aggregator.rebalance();
    expect(await comet.balanceOf(aggregator.address)).to.gte(amount);
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.COMPOUND);
  });

  it("should rebalance from compound to aave", async () => {
    const amount = 3n * 10n ** 18n;
    await deposit(Market.COMPOUND, amount);
    await aggregator.rebalance();
    expect(await aaveAweth.balanceOf(aggregator.address)).to.gte(amount);
    expect(await aggregator.fundsDepositedInto()).to.eq(Protocol.AAVE);
  });

  const SECONDS_PER_YEAR = 31536000;

  function AprToApy(apr: number): number {
    return ((1 + (apr / SECONDS_PER_YEAR)) ** SECONDS_PER_YEAR) - 1;
  }

  it("calculate APY for AAVE", async () => {
    const RAY = 10**27;

    const aavePoolAddress = await aggregator.getAavePoolAddress();
    const aavePool = await ethers.getContractAt('IPool', aavePoolAddress);
    const [
      configuration,
      liquidityIndex,
      currentLiquidityRate,
      variableBorrowIndex, 
      currentVariableBorrowRate,
      currentStableBorrowRate,
    ] = await aavePool.getReserveData(weth.address);

    // Deposit and Borrow calculations
    // APY and APR are returned here as decimals, multiply by 100 to get the percents

    console.log(`Current liquidity rate: ${currentLiquidityRate}`);

    const depositAPR = currentLiquidityRate / RAY;
    console.log(`DepositAPR: ${depositAPR}`);

    const variableBorrowAPR = currentVariableBorrowRate / RAY;
    const stableBorrowAPR = currentStableBorrowRate / RAY;

    const depositAPY = AprToApy(depositAPR);
    const variableBorrowAPY = AprToApy(variableBorrowAPR);
    const stableBorrowAPY = AprToApy(stableBorrowAPR);

    console.log('AAVE', {
      depositAPR,
      depositAPY,
      variableBorrowAPR,
      stableBorrowAPR,
      variableBorrowAPY,
    });

  });

  it("calculate APY for Compound", async () => {
    const utilization = await comet.getUtilization();
    const supplyRate = await comet.getSupplyRate(utilization);
    const supplyAPR = supplyRate / 10**18 * SECONDS_PER_YEAR;
    const supplyAPY = AprToApy(supplyAPR);

    console.log('Compound', {
      supplyAPR,
      supplyAPY
    })
  });


});

