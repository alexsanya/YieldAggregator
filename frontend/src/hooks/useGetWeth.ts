import { useState } from "react";
import useWethContract from "./useWethContract";
import { useWeb3Context } from "../context/Web3Context";

const useGetWeth = () => {
  const wethContract = useWethContract();
  const [loading, setLoading] = useState(false);

  const getWeth = async (amount: number) => {
    if (!wethContract) return;

    setLoading(true);

    try {
      const getWethTransaction = await wethContract.deposit({ value: amount });
      await getWethTransaction.wait();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return { getWeth };
};

export default useGetWeth;

