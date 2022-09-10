const { assert } = require("chai");
const { network, ethers, getNamedAccounts, deployments } = require("hardhat");
const { devChains, basicNftTokenUri } = require("../../helper-hardhat-config");

!devChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT unit test", async () => {
      let basicNft, deployer;

      beforeEach(async () => {
        deployer = await getNamedAccounts();
        // this ensures that if multiple tests uses the same contract
        // it gets deployed only once
        await deployments.fixture(["basicNft"]);
        basicNft = await ethers.getContract("BasicNFT");
      });

      describe("Constructor", () => {
        it("Should initialized the NFT contract correctly", async () => {
          const name = await basicNft.name();
          const symbol = await basicNft.symbol();
          const tokenCounter = await basicNft.getTokenCounter();

          assert.equal(name, "Fluffy");
          assert.equal(symbol, "DOG");
          assert.equal(tokenCounter, "0");
        });

        it("Should mint a new NFT token and increase token counter", async () => {
          const txResponse = await basicNft.mintNft();
          await txResponse.wait(1);
          const tokenCounter = await basicNft.getTokenCounter();

          assert.equal(tokenCounter.toString(), "1");
        });

        it("Should return the correct token uri", async () => {
          const tokenUri = await basicNft.tokenURI(0);
          assert.equal(tokenUri, basicNftTokenUri);
        });
      });
    });
