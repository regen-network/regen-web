pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Congress.sol";

contract TestCongress {

  function testAddMemberUsingDeployedContract() public {
    Congress c = Congress(DeployedAddresses.Congress());

    uint expected = 1;
    address acct_b = 0xf17f52151EbEF6C7334FAD080c5704D77216b732;

//    Assert.equal(c.addMember(acct_b,"Carlos Danger"), expected, "Owner should be Carlos Danger");
  }
/*
  function testInitialBalanceUsingDeployedContract() public {
    MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());


    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() public {
    MetaCoin meta = new MetaCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }
*/

}
