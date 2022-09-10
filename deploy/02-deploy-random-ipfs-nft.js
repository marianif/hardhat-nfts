const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { verify } = require("../utils/verify");
const { devChains, networkConfig } = require("../helper-hardhat-config");

let tokenUris = [
  "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
  "ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d",
  "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm",
];

module.exports = async () => {
  const { deployer } = await getNamedAccounts();
  const { log, deploy } = deployments;
  const chainId = network.config.chainId;
  let vrfCoordinatorV2Address, subscriptionId;
  log("Start deploying IPFS NFT...");

  if (devChains.includes(network.name)) {
    // create VRFV2 Subscription
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription();
    const transactionReceipt = await transactionResponse.wait();
    subscriptionId = transactionReceipt.events[0].args.subId;
    await vrfCoordinatorV2Mock.fundSubscription(
      subscriptionId,
      networkConfig[chainId].fundAmount
    );
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
    subscriptionId = networkConfig[chainId].subscriptionId;
  }

  const args = [
    vrfCoordinatorV2Address,
    subscriptionId,
    networkConfig[chainId].gasLane,
    networkConfig[chainId].callbackGasLimit,
    tokenUris,
    networkConfig[chainId].mintFee,
    deployer,
  ];

  const ipfsNft = await deploy("RandomIpfsNft", {
    from: deployer,
    log: true,
    args,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!devChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(ipfsNft.address, args);
  }
};

module.exports.tags = ["all", "basicNft"];
