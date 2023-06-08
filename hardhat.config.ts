import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/jkGAsM46sQzSvCIw2r1QPqmRtU_tfuSX",
        blocknumber: 17402757
      }
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    }
  }
};

export default config;
