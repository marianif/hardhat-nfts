const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { verify } = require("../utils/verify");
const { devChains } = require("../helper-hardhat-config");

module.exports = async () => {
  const { deployer } = await getNamedAccounts();
  const { log, deploy } = deployments;
  log("Start deploying basic Nft...");

  const args = [];
  const basicNft = await deploy("BasicNFT", {
    from: deployer,
    log: true,
    args,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!devChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(basicNft.address, args);
  }

  log(basicNft);
  log("Basic NFT deployed successfully");
};

module.exports.tags = ["all", "basicNft"];
