import { Chain } from "opensea-js"
import { config } from "dotenv"

// Load environment variables from .env file
config()

const getEnvRequired = (key: string) => {
  const value = process.env[key]
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

const networks = {
  // mainnet: {
  //   chainId: 1,
  //   chainName: "ethereum",
  //   baseURL: "https://api.opensea.io/api/",
  //   wethAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  //   apiKey: getEnvRequired("API_KEY"),
  //   rpcUrl: getEnvRequired("MAINNET_RPC_URL"),
  //   network: Chain.Mainnet,
  //   collectionSlug: getEnvRequired("MAINNET_RPC_URL"),
  //   itemAssetContractAddress: getEnvRequired(
  //     "MAINNET_ITEM_ASSET_CONTRACT_ADDRESS",
  //   ),
  //   itemTokenIdentifier: getEnvRequired("MAINNET_ITEM_TOKEN_IDENTIFIER"),
  // },
  testnets: {
    chainId: 11155111,
    chainName: "sepolia",
    baseURL: "https://testnets-api.opensea.io/api/v2/", // [] need to double-check
    wethAddress: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9", // this is the weth that can be used to make offers on opensea sepolia
    apiKey: undefined,
    rpcUrl: getEnvRequired("TESTNETS_RPC_URL"),
    network: Chain.Sepolia,
    collectionSlug:
      getEnvRequired("TESTNETS_COLLECTION_SLUG") ||
      "boredapeyachtclubsepolia-placeholder", // specify the OS collection slug for your interested NFT collection
    itemAssetContractAddress:
      getEnvRequired("TESTNETS_ITEM_ASSET_CONTRACT_ADDRESS") ||
      "0xE29F8038d1A3445Ab22AD1373c65eC0a6E1161a4",
    itemTokenIdentifier: process.env.TESTNETS_ITEM_TOKEN_IDENTIFIER || "166",
  },
}

export const getNetwork = () => {
  const network = getEnvRequired("NETWORK")
  switch (network) {
    // case "mainnet":
    //   return networks.mainnet
    case "testnets":
      return networks.testnets
    case undefined:
      console.warn("No network found in .env. Defaulting to testnets.")
      return networks.testnets
    default:
      throw `Invalid network found in .env. Please add "NETWORK=mainnet" or "NETWORK=testnets" to your .env file.`
  }
}
