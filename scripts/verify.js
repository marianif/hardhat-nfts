const { run } = require("hardhat");

const verify = async (address, args) => {
  console.log("Verifying contract ...");

  try {
    run("verify:verify", {
      address,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract has already been verified");
      return;
    }

    console.log("Contract verifyed successfully!");
  }
};

module.exports = {
  verify,
};
