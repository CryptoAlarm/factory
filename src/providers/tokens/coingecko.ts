import { coinGeckoApiURL, currencyList } from "../../config/token/coingecko"
import { TokenData} from "../../types"
import axios from "axios"
import { getDirhamMadPrice } from "../server/getDirhamMadPrice";
import { getEsbPriceInWax } from "../server/getWaxESBContractsPrice";

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
      const esb = getEsbPriceInWax()
  
      data["esbcontracts"] = {
        usd: esb * data["wax"].usd,
        eur: esb * data["wax"].eur,
        gbp: esb * data["wax"].gbp,
        thb: esb * data["wax"].thb,
        php: esb * data["wax"].php,
        idr: esb * data["wax"].idr,
        mad: esb * 0,
        brl: esb * data["wax"].brl,
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
