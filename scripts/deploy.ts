import { ethers } from "hardhat";

async function main() {

  const Aggregator = await ethers.getContractFactory("Aggregator");
  const aggregator = await Aggregator.deploy();

  await aggregator.deployed();

  console.log(
    `Aggregator contract address: ${aggregator.address}`
  );
  const [deployer] = await ethers.getSigners();
  console.log(
    `Deployer: ${deployer.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
