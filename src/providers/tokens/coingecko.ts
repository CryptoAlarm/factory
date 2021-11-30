import { coinGeckoApiURL, currencyList } from "../../config/token/coingecko"
import { TokenData} from "../../types"
import axios from "axios"

const buildEndpointURL = (token: string): string => {
  return (
    coinGeckoApiURL + "/price?ids=" + token + "&vs_currencies=" + currencyList
  );
};

export const coinGeckoPrice = async (tokenList: string[]): Promise<Partial<TokenData>> => {

  try {

    const tokenListWrapped = tokenList.join(",")
   
    const endpoint = buildEndpointURL(tokenListWrapped)

    const { data } = await axios.get<TokenData>(endpoint);

    if (!data) return {}

    return data;

  } catch (error) {
    
    console.log("Failed to request endpoint: " 
      + buildEndpointURL(tokenList?.join(","))
    )

    return {};
  }
};
