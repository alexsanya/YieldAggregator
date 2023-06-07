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
    } 
  }
};

export default config;
