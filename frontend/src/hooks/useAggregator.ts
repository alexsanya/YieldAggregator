import { useEffect, useState } from "react";
import useYieldAggregatorContract from "./useYieldAggregatorContract";
import useWethContract from "./useWethContract";
import { useWeb3Context } from "../context/Web3Context";

const useAggregator = () => {
  const aggregatorContract = useYieldAggregatorContract();
  const wethContract = useWethContract();
  const [loading, setLoading] = useState(false);

  const deposit = async (amount: number) => {
    if (!aggregatorContract || !wethContract) return;

    setLoading(true);

    try {
      const approveWethTransaction = await wethContract.approve(await aggregatorContract.getAddress(), amount);
      await approveWethTransaction.wait();
      const depositTransaction = await aggregatorContract.deposit(0, amount);
      await depositTransaction.wait();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return { deposit };
};

export default useAggregator;
