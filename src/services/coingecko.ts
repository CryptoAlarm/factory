import { coinGeckoApiURL, currencyList } from "../config/coingecko"
import {TokenData} from "../types/index"
import axios from "axios"

const buildEndpointURL = (token: string): string => {
  return (
    coinGeckoApiURL + "/price?ids=" + token + "&vs_currencies=" + currencyList
  );
};

export const coinGeckoPrice = async (token: string): Promise<Partial<TokenData>> => {
  try {
    const response = await axios.get(buildEndpointURL(token));
    const data = response.data;

    if (!data) return {}; 

    return data;

  } catch (error) {
    
    console.log("Failed to request endpoint: " + buildEndpointURL(token));

    return {};
  }
};
