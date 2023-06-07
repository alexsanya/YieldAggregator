// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "./IComet.sol";

contract Aggregator is Ownable {
  enum Market{ AAVE, COMPOUND, NONE }
  enum Protocol{ AAVE, COMPOUND, NONE }

  event Deposit(Market market, uint256 amount);
  event Withdrawal(Market market, uint256 amount);
  event Rebalance(Market from, Market to);

  Protocol public fundsDepositedInto = Protocol.NONE;

  address public constant AAVE_V3_MAINNET_POOL_ADDRESS_PROVIDER_ADDRESS = 0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e;
  address public constant WETH_MAINNET_ADDRESS = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  address public constant COMPOUND_V3_PROXY_MAINNET_ADDRESS = 0xA17581A9E3356d9A858b789D68B4d866e593aE94;
  address public constant AAVE_A_WETH_MAINNET_ADDRESS = 0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8;

  IERC20 immutable weth;
  IERC20 immutable aaveAweth;
  IComet immutable comet;

  constructor() Ownable() {
    weth = IERC20(WETH_MAINNET_ADDRESS);
    aaveAweth = IERC20(AAVE_A_WETH_MAINNET_ADDRESS);
    comet = IComet(COMPOUND_V3_PROXY_MAINNET_ADDRESS);
  }

  function deposit(Market _market, uint256 weth_amount) external onlyOwner {
    require(fundsDepositedInto == Protocol.NONE, "You should withdraw before re-deposit");
    weth.transferFrom(msg.sender, address(this), weth_amount);
    if (_market == Market.AAVE) {
      _deposit_to_aave(weth_amount);
    } else {
      _deposit_to_compound(weth_amount);
    }
    emit Deposit(_market, weth_amount);
  }

  function _getAavePool() private view returns (IPool) {
    address aaveV3PoolAddress = IPoolAddressesProvider(AAVE_V3_MAINNET_POOL_ADDRESS_PROVIDER_ADDRESS).getPool();
    return IPool(aaveV3PoolAddress);
  }

  function getAavePoolAddress() external view returns (address) {
    return address(_getAavePool());
  }

  function _deposit_to_aave(uint256 weth_amount) private {
    IPool aavePool = _getAavePool();
    weth.approve(address(aavePool), weth_amount);
    aavePool.supply(address(weth), weth_amount, address(this), 0);
    fundsDepositedInto = Protocol.AAVE;
  }

  function _deposit_to_compound(uint256 weth_amount) private {
    weth.approve(address(comet), weth_amount);
    comet.supply(address(weth), weth_amount);
    fundsDepositedInto = Protocol.COMPOUND;
  }

  function withdraw() external onlyOwner returns (uint256) {
    require(fundsDepositedInto != Protocol.NONE, "Nothing to withdraw");
    if (fundsDepositedInto == Protocol.COMPOUND) {
      uint256 amount = _withdraw_from_compound();
      weth.transfer(msg.sender, amount);
      fundsDepositedInto = Protocol.NONE;
      emit Withdrawal(Market.COMPOUND, amount);
      return amount;
    } else {
      uint256 amount = _withdraw_from_aave();
      weth.transfer(msg.sender, amount);
      fundsDepositedInto = Protocol.NONE;
      emit Withdrawal(Market.AAVE, amount);
      return amount;
    }
  }

  function getBalance() external view returns (uint256) {
    if (fundsDepositedInto == Protocol.AAVE) {
      return aaveAweth.balanceOf(address(this));
    }
    if (fundsDepositedInto == Protocol.COMPOUND) {
      return comet.balanceOf(address(this));
    }
    return 0;
  }

  function _withdraw_from_compound() private returns (uint256) {
    comet.withdraw(address(weth), comet.balanceOf(address(this)));
    return weth.balanceOf(address(this));
  }

  function _withdraw_from_aave() private returns (uint256) {
    IPool aavePool = _getAavePool();
    aaveAweth.approve(address(aavePool), type(uint).max);
    aavePool.withdraw(address(weth), type(uint).max, address(this));
    return weth.balanceOf(address(this));
  }

  function rebalance() external onlyOwner returns (Market) {
    require(fundsDepositedInto != Protocol.NONE, "Nothing to rebalance");
    if (fundsDepositedInto == Protocol.AAVE) {
       uint256 amount = _withdraw_from_aave();
      _deposit_to_compound(amount);
      emit Rebalance(Market.AAVE, Market.COMPOUND);
      return Market.COMPOUND;
    } else {
       uint256 amount = _withdraw_from_compound();
      _deposit_to_aave(amount);
      emit Rebalance(Market.COMPOUND, Market.AAVE);
      return Market.AAVE;
    }
  }
}

