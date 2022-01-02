import { ProvidersMap, ProvidersConfig } from "./providers.map";
import { getTokensList, setTokensPrices } from "./providers/server/";
import { setWanakaLands } from "./providers/server/setWanakaData";
import {
  TokenData,
  Providers,
  Tokens,
  TokensReduced,
} from "./types/server/token";
import { LandsProps } from "./types/tools/wanaka.marketplace";

let TokenPricesList = {} as TokenData;
let LandsList: Partial<LandsProps[]> = []


function PricesFetchByTokenReference(TokensReduced: TokensReduced): void {
  /**
   * @param Tokens: Tokens[]
   * @param TokensReduced: TokensReduced
   * @type Providers = apeswap | mir4 | factorychain | pancakeswap | coingecko
   *
   * Fetch all nodes in TokensReduce object mapping their key with ProvidersMap
   * Then map keys to their particular callbacks signed on /src/providers/tokens/
   *
   * Response will be assign into a global variable TokenPricesList that should be POSTed to server
   */
  Object.keys(TokensReduced).map(async (key: Providers) => {
    /**
     * Coingecko API supports all entire references in once request,
     * that means we pass all reference-id in a string[] to coingecko Provider.     *
     * the rest are called one by one
     */
    if (!ProvidersMap.hasOwnProperty(key)) {
      //Not supported Provider
      return false
    }

    if (key !== "coingecko") {
      TokensReduced[key]?.map(async (token) => {
        try {
          const price = await ProvidersMap[key]?.call(this, token);

          if (price?.[token.ref]?.usd) {
            TokenPricesList = {
              ...TokenPricesList,
              ...price,
            };
          }
        } catch (error) {
        }
      });
    } 
    else if (key === "coingecko") {
      try {
        const refList = TokensReduced[key]?.map((token) => token.ref);

        let response = await ProvidersMap[key].call(this, { refList });

        let keys = Object.keys(response);

        if (keys.length) {
          TokenPricesList = {
            ...TokenPricesList,
            ...response,
          };
        }

        if (keys.includes("binance-usd")) {
          /*
           * Schedule to upsert ProvidersConfig prices object.
           * Since only coingecko return subcurrencies value,
           * we share it with another Providers aka pancake, apeswap...
           */
          ProvidersConfig.ListCurrenciesArray.forEach((currency) => {
            ProvidersConfig.prices.prices[currency] =
              response["binance-usd"]?.[currency];
          });
        }
      } catch (error) {
      }
    }
  });
}

function FormatTokens(Tokens: Tokens[]): TokensReduced {
  /**
   * Reduce Tokens[] into TokensReduced type, mapped by api key
   */
  return Tokens.reduce((tokens, current) => {
    tokens[current.api] = tokens[current.api] || [];

    tokens[current.api].push({
      contract: current.contract,
      ref: current.ref,
    });
    return tokens;    
  }, {} as TokensReduced);
}
async function WanakaToolsFetch(landID: number): Promise<void> {
  try {
    let response = 
      await ProvidersMap.tools.wanaka.call(this, landID)

    if (! response.itemId) {
      throw new Error("Failed to fetch wanakamarket provider")      
    }

    LandsList.push(response)

  } catch (error) { }  
}


;(async () => {

  /**
   * @GET ${endpoint}/private/tokensList
   * 
   * request and build reference list object to start 
   * @function PricesFetchByTokenReference procedure.
  */
  let Tokens = await getTokensList();
  let TokensReduced = await Promise.resolve(FormatTokens(Tokens));
  
  /**
   * Procedure to check if there is a new price created on database.
   * then, request and build reference list object to start 
   * @function PricesFetchByTokenReference procedure.
  */
  setInterval(async () => {
    Tokens = await getTokensList();
    TokensReduced = await Promise.resolve(FormatTokens(Tokens));    
  }, 1000 * 60)



  /**
   *  Fetch prices builded on @var TokensReduced. Result will be 
   *  stored on global escope @var TokenPricesList.
   */
  setTimeout(() => PricesFetchByTokenReference(TokensReduced), 0); 

  /**
   *  @setInterval to Fetch prices every N seconds
   *  builded on @var TokensReduced. Result will be 
   *  stored on global escope @var TokenPricesList.
   */
  setInterval(() => PricesFetchByTokenReference(TokensReduced), 1000 * 15);

  

  /**
   * Since is there 15000 lands to cache and refresh data,
   * looking for keep it health to handle requests, we are 
   * queueing information into LandsList, then submiting to server
   * every 20 seconds. 
   * 
   * Wanakafarm endpoint has cloudfare DDoS protection, that means
   * if you overrequest it API, you can be blocked for a couple while.
   * 
   */
  let i = 0
  setInterval(() => {

    const howManyFetchsPerInterval = 6;

    for (let $ = 0; $ < howManyFetchsPerInterval; $++) {
      WanakaToolsFetch(((i + ($ * 2500)) % 15000) + 1)
    }

    ++i
  }, 3000)


  // Interval that handle submit data to API every X seconds.   
  setInterval(async () => {
    /**
     * @POST ${endpoint}/private/historyPrices
     * @param TokenPricesList 
     * @type TokenData
     * 
     * Submit TokenPricesList to API. 
     */
    setTokensPrices(TokenPricesList)
    

    /**
     * @POST ${endpoint}/private/tools/wanakafarm
     * @param LandsList 
     * @type Partial<LandsProps[]>
     * 
     * Since is there 15000 lands to cache and refresh data,
     * looking for keep it health to handle requests, we are 
     * queueing information into LandsList, then submiting to server
     * every 20 seconds. 
     * 
     * IF QUEUE HAS ANY ELEMENT, THEN SUBMIT AND CLEAN QUEUE.
     */
    if (LandsList.length) {      
      await setWanakaLands(LandsList)
      LandsList = Array()
    }
  }, 1000 * 20)




})();
