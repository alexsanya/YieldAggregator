// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";

contract Aggregator is Ownable {
  enum Market{ AAVE, COMPOUND }

  event Deposit(Market market, uint256 amount);
  event Withdrawal(uint256 amount);
  event Rebalance(address from, address to);

  address public constant AAVE_V3_MAINNET_POOL_ADDRESS_PROVIDER_ADDRESS = 0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e;
  address public constant WETH_MAINNET_ADDRESS = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

  IERC20 immutable weth;

  constructor() Ownable() {
    weth = IERC20(WETH_MAINNET_ADDRESS);
  }

  function deposit(Market _market, uint256 weth_amount) external onlyOwner {
    weth.transferFrom(msg.sender, address(this), weth_amount);
    if (_market == Market.AAVE) {
      _deposit_to_aave(weth_amount);
    } else {
      _deposit_to_compound(weth_amount);
    }
    emit Deposit(_market, weth_amount);
  }

  function _deposit_to_aave(uint256 weth_amount) private {
    address aaveV3PoolAddress = IPoolAddressesProvider(AAVE_V3_MAINNET_POOL_ADDRESS_PROVIDER_ADDRESS).getPool();
    IPool aavePool = IPool(aaveV3PoolAddress);
    weth.approve(address(aavePool), weth_amount);
    aavePool.supply(address(weth), weth_amount, address(this), 0);
  }

  function _deposit_to_compound(uint256 weth_amount) private {

  }

  function withdraw() external onlyOwner returns (uint256) {
    uint256 balance = 123;
    emit Withdrawal(balance);
    return balance;
  }

  function rebalance() external onlyOwner returns (address) {
    address from = address(0x1);
    address to = address(0x2);
    emit Rebalance(from, to);
    return to;
  }
}

