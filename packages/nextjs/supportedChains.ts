import * as chains from "@starknet-react/chains";

const rpcUrlDevnet =
  process.env.NEXT_PUBLIC_DEVNET_PROVIDER_URL || "http://127.0.0.1:5050";

  const rpcUrlMainnet = process.env.NEXT_PUBLIC_MAINNET_PROVIDER_URL;
  if (!rpcUrlMainnet) {
    throw new Error("NEXT_PUBLIC_MAINNET_PROVIDER_URL is not set");
  }

// devnet with mainnet network ID
const mainnetFork = {
  id: BigInt("0x534e5f4d41494e"),
  // id: BigInt("0x04bb93836f4e12d466a8e9737953186708dcbd8d576a810644f859119e8c84f0"),
  network: "devnet",
  name: "Starknet Devnet",
  nativeCurrency: {
    address:
      "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
      // "0x04bb93836f4e12d466a8e9737953186708dcbd8d576a810644f859119e8c84f0",
    name: "Stark",
    symbol: "STRK",
    decimals: 18,
  },
  testnet: true,
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_MAINNET_PROVIDER_URL],
    },
    public: {
      http: [`${rpcUrlDevnet}/rpc`],
    },
  },
} as chains.Chain;

const devnet = {
  ...chains.devnet,
  rpcUrls: {
    default: {
      http: [],
    },
    public: {
      http: [`${rpcUrlDevnet}/rpc`],
    },
  },
} as const satisfies chains.Chain;

export const supportedChains = { ...chains, devnet, mainnetFork };
