// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const CoinFlip = await ethers.getContractFactory("CoinFlip");
  const CoinFlipAttacker = await ethers.getContractFactory("CoinFlipAttacker");
  const coinflip = await CoinFlip.attach('0x0d7668590894F88f16a2c87D20a8C61557165235');
  const coinflipattacker = await CoinFlipAttacker.deploy("0x0d7668590894F88f16a2c87D20a8C61557165235");

  await coinflip.deployed();
  await coinflipattacker.deployed();

  console.log("CoinFlip attached at:", coinflip.address);
  console.log("CoinFlipAttacker deployed to:", coinflipattacker.address);

  await coinflipattacker.attack();  // Need to call ten times for now
  console.log('consecutive wins = ', await coinflip.consecutiveWins());
  // Should avoid redeploying, I think
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
