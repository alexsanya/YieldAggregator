// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Aggregator {
  enum Market{ AAVE, COMPOUND }

  event Deposit(Market market, uint256 amount);
  event Withdrawal(uint256 amount);
  event Rebalance(address from, address to);


  function deposit(Market _market, uint256 weth_amount) external {
    emit Deposit(_market, weth_amount);
  }

  function withdraw() external returns (uint256) {
    uint256 balance = 123;
    emit Withdrawal(balance);
    return balance;
  }

  function rebalance() external returns (address) {
    address from = address(0x1);
    address to = address(0x2);
    emit Rebalance(from, to);
    return to;
  }
}
