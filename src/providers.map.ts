import { coinGeckoPrice } from "./providers/tokens/coingecko";
import { PancakeswapPrice } from "./providers/tokens/pancake";
import { FactoryChain } from "./providers/tokens/factoryChain";
import { Mir4 } from "./providers/tokens/mir4";
import { ApeSwapWeb3Client } from "./providers/tokens/apeswap";

export const ProvidersConfig = {
  prices: {
    prices: {
      brl: 0,
      php: 0,
    },
  },

  apeswapClient: new ApeSwapWeb3Client({
    network: "bscscan",
    refreshBnbInSeconds: 15,
  }),
};

export const ProvidersMap = {
  coingecko: async ({ refList }) => {
    return coinGeckoPrice(refList);
  },

  pancakeswap: async ({ contract, ref }) => {
    return PancakeswapPrice({
      ref,
      contract,
      ...ProvidersConfig.prices,
    });
  },

  apeswap: async ({ contract, ref }) => {
    return ProvidersConfig.apeswapClient.getPriceBUSDBased(contract);
  },

  factorychain: async ({ contract, ref }) => {
    return FactoryChain(ProvidersConfig.prices);
  },

  mir4: async ({ contract, ref }) => {
    return Mir4(ProvidersConfig.prices);
  },
};