const devChains = ["hardhat", "localhost"];

const networkConfig = {
  31337: {
    name: "localhost",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    keepersUpdateInterval: "30",
    fundAmount: ethers.utils.parseEther("2"),
    callbackGasLimit: "500000", // 500,000 gas
    interval: "30",
    mintFee: "10000000000000000", // 0.01 ETH
  },
  5: {
    name: "goerli",
    vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    fundAmount: ethers.utils.parseEther("0.1"),
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    subscriptionId: "1069",
    callbackGasLimit: "50000",
    interval: "30", // 30 seconds
    mintFee: "10000000000000000", // 0.01 ETH
  },
};

const basicNftTokenUri =
  "ipfs://ipfs://bafybeifmbyvohnrmieanfray7d3k2a2q3jimhkghp4s3fs5tj3iueaajzm/";

const DECIMALS = "18";
const INITIAL_PRICE = "200000000000000000000";

module.exports = {
  devChains,
  basicNftTokenUri,
  DECIMALS,
  INITIAL_PRICE,
  networkConfig,
};
