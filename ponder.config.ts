import { createConfig } from "ponder";
import { AlchemistV3PositionAbi } from "./abis/AlchemistV3PositionAbi";
import { MYTAbi } from "./abis/MYTAbi";
import { alchemistV3Abi } from "./abis/alchemistV3Abi";
import { transmuterV3Abi } from "./abis/transmuterV3Abi";

export default createConfig({
  database: {
    kind: "postgres",
    connectionString: process.env.DATABASE_URL,
  },
  chains: {
    mainnet: { id: 1, rpc: process.env.PONDER_RPC_URL_1 },
    optimism: { id: 10, rpc: process.env.PONDER_RPC_URL_10 },
    arbitrumOne: { id: 42161, rpc: process.env.PONDER_RPC_URL_42161 },
  },
  contracts: {
    AlchemistV3Position: {
      abi: AlchemistV3PositionAbi,
      chain: {
        mainnet: {
          address: [
            "0x15da4c7db6404b92894d5214FAc92057Fb8a263d",
            "0x872a03FabC86b59c883CD9c439E969321b719bEB",
          ],
          startBlock: 24875911,
        },
        optimism: {
          address: [
            "0x763F5d567403add750e13234DB896CFe6b423059",
            "0xF700c7e40efCA6f7a810e172AFCee3592ff4aD33",
          ],
          startBlock: 150271761,
        },
        arbitrumOne: {
          address: [
            "0x763F5d567403add750e13234DB896CFe6b423059",
            "0xF700c7e40efCA6f7a810e172AFCee3592ff4aD33",
          ],
          startBlock: 452291309,
        },
      },
    },
    MYT: {
      abi: MYTAbi,
      chain: {
        mainnet: {
          address: [
            "0x9B44efCa3e2a707B63Dc00CE79d646E5E5D24bA5",
            "0x29bcfeD246ce37319d94eBa107db90C453D4c43D",
          ],
          startBlock: 24875892,
        },
        optimism: {
          address: [
            "0xAf510a560744880410f0f65e3341A020FBC2cA41",
            "0x91b8657aea26Caa8A0E9D6DD4E24727Ccf32F822",
          ],
          startBlock: 150271733,
        },
        arbitrumOne: {
          address: [
            "0xfe8F223F3d81462F55bf8609897B8cEcfA4B195C",
            "0xEba62B842081CeF5a8184318Dc5C4E4aACa9f651",
          ],
          startBlock: 452291182,
        },
      },
    },
    alchemistV3: {
      abi: alchemistV3Abi,
      chain: {
        mainnet: {
          address: [
            "0xfa995B6ABc387376C3e7De5f6d394Ab5B6beE26B",
            "0xeB83112d925268BeDe86654C13D423a987587e3E",
          ],
          startBlock: 24875910,
        },
        optimism: {
          address: [
            "0x930750a3510E703535e943E826ABa3c364fFC1De",
            "0xDeD3A04612FF12b57317abE38e68026Fc9D28114",
          ],
          startBlock: 150271759,
        },
        arbitrumOne: {
          address: [
            "0xDeD3A04612FF12b57317abE38e68026Fc9D28114",
            "0x930750a3510E703535e943E826ABa3c364fFC1De",
          ],
          startBlock: 452291301,
        },
      },
    },
    transmuterV3: {
      abi: transmuterV3Abi,
      chain: {
        mainnet: {
          address: [
            "0x073598132f37756a7E665FB52f1757463120bd3C",
            "0x2584E8b0616b3E750492c9629a3b27679C410cb9",
          ],
          startBlock: 24875900,
        },
        optimism: {
          address: [
            "0x693b7594Ae0633d9c5574D0da46a040f92F5b281",
            "0x2584E8b0616b3E750492c9629a3b27679C410cb9",
          ],
          startBlock: 150271749,
        },
        arbitrumOne: {
          address: [
            "0x2584E8b0616b3E750492c9629a3b27679C410cb9",
            "0x693b7594Ae0633d9c5574D0da46a040f92F5b281",
          ],
          startBlock: 452291254,
        },
      },
    },
  },
});
