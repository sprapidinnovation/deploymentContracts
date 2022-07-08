const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // We get the contract to deploy

  const FakeTenfi = await hre.ethers.getContractFactory("FakeTenfi");
  const faketenfi = await FakeTenfi.deploy();
  await faketenfi.deployed();
  const Farm = await hre.ethers.getContractFactory("TENFIFarm");
  const farm = await Farm.deploy();
  await farm.deployed();
  

  console.log("Fake Tenfi deployed to:", faketenfi.address);
  console.log("Farm deployed to:", farm.address);

  await faketenfi.mint(faketenfi.owner(), ethers.utils.parseEther("1000"));
  await faketenfi.transferOwnership(farm.address);

  // const Depositor = await hre.ethers.getContractFactory("Depositor");
  // const depositor = await Depositor.deploy();

  // await depositor.deployed();

  // console.log("depositer deployed to:", depositor.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
