import { coinGeckoPrice } from "./providers/tokens/coingecko";
import { PancakeswapPrice } from "./providers/tokens/pancake";
import { FactoryChain } from "./providers/tokens/factoryChain";
import { Mir4 } from "./providers/tokens/mir4";
import { ApeSwapWeb3Client } from "./providers/tokens/apeswap";

import { ListCurrencies, ListCurrenciesArray } from "./types/server/token"
import { WanakaMarketplaceProvider } from "./providers/tools/wanaka.marketplace";


export const ProvidersConfig = {

  ListCurrenciesArray,

  prices: {
    prices: ListCurrenciesArray.reduce((a,b) => {
      a[b] = a[b] || []
      a[b] = 0
      return a
    } , {}) as typeof ListCurrencies
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
      ...ProvidersConfig.prices.prices,
    });
  },

  apeswap: async ({ contract, ref }) => {
    return ProvidersConfig.apeswapClient.getPriceBUSDBased(contract);
  },

  factorychain: async ({ contract, ref }) => {
    return FactoryChain(ProvidersConfig.prices.prices);
  },

  mir4: async ({ contract, ref }) => {
    return Mir4(ProvidersConfig.prices.prices);
  },

  tools: {
    wanaka: (landID) => {
      return WanakaMarketplaceProvider(landID)
    }
  }
};