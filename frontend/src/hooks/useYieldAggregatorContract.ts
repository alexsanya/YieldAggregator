import { Contract } from "ethers";
import { useMemo } from "react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import { YIELD_AGGREGATOR_ADDRESS } from "../config";
import ABI from "../abis/YieldAggregator.json";

const address = YIELD_AGGREGATOR_ADDRESS;

const useYieldAggregatorContract = () => {
  const { state } = useWeb3Context() as IWeb3Context;

  return useMemo(
    () => state.signer && new Contract(address, ABI, state.signer),
    [state.signer]
  );
};

export default useYieldAggregatorContract;

