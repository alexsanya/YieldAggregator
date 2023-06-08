import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { useWeb3Context } from "../context/Web3Context";
import useYieldAggregatorContract from "./useYieldAggregatorContract";
import useWethContract from "./useWethContract";
import aavePoolAbi from "../abis/AAVEpool.json";
import cometAbi from "../abis/cometAbi.json";

const useAPYs = () => {
  const { state } = useWeb3Context() as IWeb3Context;
  const aggregatorContract = useYieldAggregatorContract();
  const wethContract = useWethContract();
  const [apyAAVE, setAPYaave] = useState(0);
  const [apyCompound, setAPYcompound] = useState(0);

  useEffect(() => {
    if (!aggregatorContract) return;
    let mounted = true;

    const SECONDS_PER_YEAR = 31536000;

    function AprToApy(apr: number): number {
      return ((1 + (apr / SECONDS_PER_YEAR)) ** SECONDS_PER_YEAR) - 1;
    }

    const getApyAAVE = async () => {
      const RAY = 10**27;
      const aavePoolAddress = await aggregatorContract.getAavePoolAddress();
      const aavePool = new Contract(aavePoolAddress, aavePoolAbi, state.signer);
      const [
        configuration,
        liquidityIndex,
        currentLiquidityRate,
        variableBorrowIndex, 
        currentVariableBorrowRate,
        currentStableBorrowRate,
      ] = await aavePool.getReserveData(await wethContract.getAddress());
      
      const supplyAPR = Number(currentLiquidityRate) / RAY;

      const supplyAPY = AprToApy(supplyAPR);
      setAPYaave(supplyAPY);
    }

    const getApyCompound = async () => {
      const cometAddress = await aggregatorContract.COMPOUND_V3_PROXY_MAINNET_ADDRESS();
      const comet = new Contract(cometAddress, cometAbi, state.signer);
      const utilization = await comet.getUtilization();
      const supplyRate = await comet.getSupplyRate(utilization);
      const supplyAPR = Number(supplyRate) / 10**18 * SECONDS_PER_YEAR;
      const supplyAPY = AprToApy(supplyAPR);
      setAPYcompound(supplyAPY);
    }

    if (mounted) {
      getApyAAVE();
      getApyCompound();
    }


    return () => {
      mounted = false;
    };
  }, [aggregatorContract]);

  return { apyAAVE, apyCompound };

}

export default useAPYs;

