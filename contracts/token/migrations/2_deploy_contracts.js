var RegenToken = artifacts.require("./RegenToken.sol");

module.exports = function(deployer) {
  deployer.deploy(RegenToken);
};
