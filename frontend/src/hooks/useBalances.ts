import { useEffect, useState } from "react";
import { useWeb3Context } from "../context/Web3Context";
import useWethContract from "./useWethContract";
import useYieldAggregatorContract from "./useYieldAggregatorContract";
import { YIELD_AGGREGATOR_ADDRESS, USER_ADDRESS } from "../config";

const useBalances = () => {
  const { state } = useWeb3Context() as IWeb3Context;
  const weth = useWethContract();
  const aggregator = useYieldAggregatorContract();
  const [aggregatorBalance, setAggregatorBalance] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string | null>(null);

  useEffect(() => {
    if (!weth) return;
    let mounted = true;

    const getAggregatorBalance = async () => {
      try {
        const response = await aggregator.getBalance();
        setAggregatorBalance(response.toString());
      } catch {}
    }

    const getWalletBalance = async () => {
      try {
        const response = await weth.balanceOf(state.address);
        setWalletBalance(response.toString());
      } catch {}
    }

    if (mounted) {
      getAggregatorBalance();
      getWalletBalance();
    }

    return () => {
      mounted = false;
    };
  }, [weth]);

  return { aggregatorBalance, walletBalance };
}

export default useBalances;
