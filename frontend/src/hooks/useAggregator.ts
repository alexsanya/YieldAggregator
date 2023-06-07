import { useEffect, useState } from "react";
import useYieldAggregatorContract from "./useYieldAggregatorContract";
import useWethContract from "./useWethContract";
import { useWeb3Context } from "../context/Web3Context";

const useAggregator = () => {
  const aggregatorContract = useYieldAggregatorContract();
  const wethContract = useWethContract();
  const [loading, setLoading] = useState(false);
  const [protocolAddress, setProtocolAddress] = useState("None");

    enum Protocol {
    AAVE = 0,
    COMPOUND = 1
  }

  useEffect(() => {
    if (!aggregatorContract) return;
    let mounted = true;

    const getProtocolAddress = async () => {
      try {
        const protocol = await aggregatorContract.fundsDepositedInto();
        console.log(`Protocol: ${protocol}`, protocol);
        console.log(protocol.toString());
        if (protocol == Protocol.AAVE) {
          console.log('AAVE');
          const poolAddress = await aggregatorContract.getAavePoolAddress();
          console.log(poolAddress);
          setProtocolAddress(await aggregatorContract.getAavePoolAddress());
          return;
        }
        if (protocol == Protocol.COMPOUND) {
          console.log('COMPOUND');
          setProtocolAddress(await aggregatorContract.COMPOUND_V3_PROXY_MAINNET_ADDRESS());
          return;
        }
        setProtocolAddress("No deposited");
      } catch {}
    }

    if (mounted) {
      getProtocolAddress();
    }

    return () => {
      mounted = false;
    };
  }, [aggregatorContract]);


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

  const withdraw = async () => {
    if (!aggregatorContract) return;
    const withdrawTransaction = await aggregatorContract.withdraw();
    await withdrawTransaction.wait();
  }

  const rebalance = async () => {
    if (!aggregatorContract) return;
    const withdrawTransaction = await aggregatorContract.rebalance();
    await withdrawTransaction.wait();
  }


  return { deposit, withdraw, rebalance, protocolAddress };
};

export default useAggregator;
