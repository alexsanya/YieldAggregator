import { Contract } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import { WETH_MAINNET_ADDRESS } from "../config";
import ABI from "../abis/WETH.json";

const address = WETH_MAINNET_ADDRESS;

const useWethContract = () => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => state.signer && new Contract(address, ABI, state.signer),
    [state.signer]
  );
};

export default useWethContract;

