import {coinGeckoPrice} from "./providers/tokens/coingecko"
import {PancakeswapPrice} from "./providers/tokens/pancake"
import {FactoryChain} from "./providers/tokens/factoryChain"
import {Mir4} from "./providers/tokens/mir4"
import {ApeSwapWeb3Client} from "./providers/tokens/apeswap"

import { TokenData } from "./types";



let TokenPricesList = {} as TokenData

;(async() => {


  let ProvidersParamsMap = {

    coingecko: (tokenList) => {
      return [...tokenList]      
    },

    pancakeswap: (raw) => {

      return {
        contract: raw.contract,
        ref: raw.ref
      }
    }
  }
  let ProvidersMap = {

    prices: {  
      prices: {
        brl: 0,
        php: 0    
      }           
    },

    apeswapClient: new ApeSwapWeb3Client({
      network: "bscscan",
      refreshBnbInSeconds: 15
    }),


    coingecko: async ({refList}) => {
      return coinGeckoPrice(refList)
    },

    pancakeswap: async ({contract, ref}) => {
      return PancakeswapPrice({
        ref,
        contract,
        ...ProvidersMap.prices
      })
    },

    apeswap: async ({contract}) => {
      return ProvidersMap.apeswapClient.getPriceBUSDBased(contract)
    },

    factorychain: async ({}) => {
      return FactoryChain(ProvidersMap.prices)
    },

    mir4: async ({}) => {
      return Mir4(ProvidersMap.prices)
    },  
  };

  
  type Providers = "apeswap" | "mir4" | "factorychain" | "pancakeswap" | "coingecko";
  interface Bots {
    ref: string,
    contract: string,
    api: Providers
  }
  
  let tokens: Bots[] = [{
    ref: "",
    contract: "",
    api: "pancakeswap",
  }]

  let params
  
  tokens.map(({ref, contract, api}) => {
    
    ProvidersMap[api].call(this, params)


  })


})();