import { useMemo, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IWeb3Context, useWeb3Context } from "../context/Web3Context";
import { MdCheck, MdError } from "react-icons/md";
import useBalances from "../hooks/useBalances";
import useAggregator from "../hooks/useAggregator";
import useGetWeth from "../hooks/useGetWeth";
import Link from "next/link";

const ETHMainnerChainID = 31337;

export default function Home() {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context() as IWeb3Context;

  const { deposit, withdraw, rebalance, protocolAddress, apyAAVE, apyCompound, loading } = useAggregator();
  const { getWeth } = useGetWeth();
  const { aggregatorBalance, walletBalance } = useBalances();
  const [amountStr, setAmountStr] = useState<string>("");

  const correctNetwork = useMemo(() => {
    return currentChain === ETHMainnerChainID;
  }, [currentChain]);

  const handleDeposit = async (e: any) => {
    e.preventDefault();
    if (amountStr.trim() === "") return;

    deposit(parseInt(amountStr));
  };

  const handleGetWeth = async (e: any) => {
    getWeth(parseInt(amountStr));
  };

  const handleWithdraw = async (e: any) => {
    withdraw();
  };

  const handleRebalance = async (e: any) => {
    rebalance();
  };

  return (
    <div>
      <Head>
        <title>Next + Ethers dApp</title>
      </Head>
      <HStack
        width="full"
        as="header"
        height="80px"
        px={4}
        alignItems="center"
        bg="gray.100"
      >
        <HStack as="nav" width="full" justifyContent="space-between">
          <HStack>
            {!isAuthenticated ? (
              <Button
                onClick={connectWallet}
                variant="solid"
                bg="blue.400"
                colorScheme="blue"
                gap={2}
                color="white"
              >
                Connect wallet
              </Button>
            ) : (
              <Button
                onClick={disconnect}
                variant="solid"
                bg="red.400"
                colorScheme="red"
                color="white"
                gap={2}
              >
                Disconnect
              </Button>
            )}
          </HStack>
        </HStack>
      </HStack>
      {isAuthenticated &&
        (correctNetwork ? (
          <VStack ml={4} mt={4} spacing={4} alignItems="flex-start">
            <Text>
              Wallet balance: {walletBalance ? walletBalance : "Loading..."}
            </Text>
            <HStack>
              <Text>Deposited: {aggregatorBalance ? aggregatorBalance : "Loading..."}</Text>
            </HStack>
            <HStack>
              <Text>Deposited into: {protocolAddress ? protocolAddress : "Loading..."}</Text>
            </HStack>
            <HStack>
              <Text>Supply APY on AAVE: {apyAAVE ? apyAAVE * 100 + '%' : "Loading..."}</Text>
            </HStack>
            <HStack>
              <Text>Supply APY on Compound: {apyCompound ? apyCompound * 100 + '%' : "Loading..."}</Text>
            </HStack>
            <Box
              onSubmit={handleGetWeth}
              as="form"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Input
                type="text"
                placeholder="Enter amount"
                variant="flushed"
                colorScheme="blue"
                name="amount"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
              />
              <Button
                type="submit"
                variant="solid"
                bg="yellow.400"
                colorScheme="green"
                color="white"
                gap={2}
                isLoading={loading}
              >
                Get WETH
              </Button>
            </Box>
            <Box
              onSubmit={handleDeposit}
              as="form"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Button
                type="submit"
                variant="solid"
                bg="green.400"
                colorScheme="green"
                color="white"
                gap={2}
                isLoading={loading}
              >
                Deposit
              </Button>
            </Box>
            <Box
              onSubmit={handleWithdraw}
              as="form"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Button
                type="submit"
                variant="solid"
                bg="blue.400"
                colorScheme="green"
                color="white"
                gap={2}
                isLoading={loading}
              >
                Withdraw
              </Button>
            </Box>
            <Box
              onSubmit={handleRebalance}
              as="form"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Button
                type="submit"
                variant="solid"
                bg="gray.400"
                colorScheme="green"
                color="white"
                gap={2}
                isLoading={loading}
              >
                Rebalance
              </Button>
            </Box>
          </VStack>
        ) : (
          <HStack spacing={2} ml={4} mt={4}>
            <Icon as={MdError} color="red.400" />
            <Text color="red.400">Please switch to Ethereum Mainnet fork</Text>
          </HStack>
        ))}
    </div>
  );
}

