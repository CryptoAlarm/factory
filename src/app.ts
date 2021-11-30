import axios from "axios";

import { TokenData, Providers, Tokens, TokensReduced } from "./types/server/token";
import { ProvidersMap, ProvidersConfig } from "./providers.map";

import {getTokensList} from "./providers/server/getTokensList"

let TokenPricesList = {} as TokenData;
let Tokens = [] as Tokens[]

;(async () => {
  
  
  Tokens = await getTokensList()

  //Reduce a Tokens[] array into a TokensReduce object type
  const TokensReduced = Tokens.reduce((tokens, current) => {
    tokens[current.api] = tokens[current.api] || [];

    tokens[current.api].push({
      contract: current.contract,
      ref: current.ref,
    });

    return tokens;
  }, {} as TokensReduced)


  /**
   * @var key: Providers
   * @type Providers = apeswap | mir4 | factorychain | pancakeswap | coingecko
   * 
   * Fetch all nodes in TokensReduce object mapping their key with ProvidersMap
   * ProvidersMap, then maps keys to their particular callbacks signed on /src/providers/tokens/
   * 
   * Response will be assign into a global variable TokenPricesList that should be POSTed to server
   */

  const TokensFetch = (Tokens: Tokens[], TokensReduced: TokensReduced) => {
    Object.keys(TokensReduced).map(async (key: Providers) => {
      /**
       * Coingecko API supports all entire references in once request,
       * that means we pass all reference-id in a string[] to coingecko Provider.     * 
       * the rest are called one by one
       */
      if (key !== "coingecko") {
        TokensReduced[key]?.map(async (token) => {
          try {
            const price = await ProvidersMap[key].call(this, token)
            
            TokenPricesList = { 
              ...TokenPricesList, 
              ...price 
            }
  
          } catch (error) {}
        })
      } else if (key === "coingecko") {
        try {
          const refList = TokensReduced[key]?.map((token) => token.ref )
  
          let response = await ProvidersMap[key].call(this, { refList })
  
          let keys = Object.keys(response)
  
          if (keys.length) {
            TokenPricesList = { 
              ...TokenPricesList, 
              ...response 
            }
          }
         
          if (keys.includes("binance-usd")) {
            /*
            * Schedule to upsert ProvidersConfig prices object.
            * Since only coingecko return subcurrencies value, 
            * we share it with another Providers aka pancake, apeswap...
            */
            ProvidersConfig.ListCurrenciesArray.forEach((currency) => {
              ProvidersConfig.prices
                .prices[currency] = response["binance-usd"][currency]
            })
          }
  
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  
  TokensFetch(Tokens, TokensReduced)
  setInterval(() => TokensFetch(Tokens, TokensReduced), 1000 * 15)
  

  setInterval(() => {
    console.log(TokenPricesList)
  }, 5000)
})();
