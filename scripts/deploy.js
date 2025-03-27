const hre = require("hardhat");

async function main() {
  // 1. Explicitly compile contracts
  await hre.run('compile');
  console.log("Compilation complete!");

  // 2. Get the contract factory
  const Voting = await hre.ethers.getContractFactory("Voting");
  console.log("Deploying Voting contract...");

  // 3. Deploy with modern ethers.js v6 syntax
  const voting = await Voting.deploy();
  const deploymentReceipt = await voting.deploymentTransaction().wait();
  
  // 4. Get deployment details
  console.log("\nDeployment successful!");
  console.log("Contract address:", await voting.getAddress());
  console.log("Transaction hash:", deploymentReceipt.hash);
  console.log("Block number:", deploymentReceipt.blockNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\nDeployment failed:");
    console.error(error);
    process.exit(1);
  });