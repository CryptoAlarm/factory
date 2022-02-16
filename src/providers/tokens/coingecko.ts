import { coinGeckoApiURL, currencyList } from "../../config/token/coingecko"
import { TokenData} from "../../types"
import axios from "axios"
import { getDirhamMadPrice } from "../server/getDirhamMadPrice";
import { getAlchorWaxExchangePrices } from "../server/getAlchorWaxExchangePrices";

const buildEndpointURL = (token: string): string => {
  return (
    coinGeckoApiURL + "/price?ids=" + token + "&vs_currencies=" + currencyList
  );
};

export const coinGeckoPrice = async (tokenList: string[]): Promise<Partial<TokenData>> => {

  try {

    const tokenListWrapped = tokenList.join(",")
   
    const endpoint = buildEndpointURL(tokenListWrapped)

    let { data } = await axios.get<TokenData>(endpoint);

    if (!data) return {}



    /**
     *  Personal request to add ESBCONTRACTS currency by @MohamedFox
     */

    if (data["wax"]) {
      const AlchorWaxExchangePrices = getAlchorWaxExchangePrices()
  
      for (const key in AlchorWaxExchangePrices) {
        const {ref , value } = AlchorWaxExchangePrices[key]
        data[ref] = {
          usd: value * data["wax"].usd,
          eur: value * data["wax"].eur,
          gbp: value * data["wax"].gbp,
          thb: value * data["wax"].thb,
          php: value * data["wax"].php,
          idr: value * data["wax"].idr,
          mad: value * 0,
          brl: value * data["wax"].brl,
        }        
      }
    }
   

    /**
     *  Personal request to add MAD currency by @MomRabeh
     */
    const mad = getDirhamMadPrice()

    Object.keys(data).forEach(key => {
      data[key].mad = data[key].usd * mad
    })


    return data;

  } catch (error) {
    
    console.log("Failed to request endpoint: " 
      + buildEndpointURL(tokenList?.join(","))
    )

    return {};
  }
};
