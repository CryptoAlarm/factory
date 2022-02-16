
import axios from "axios"

import {endpoint} from "../../config/token/mir4"


import { Mir4Response, TokenData} from "../../types"
import { ListCurrencies, ListCurrenciesArray } from "../../types/server/token"

export const Mir4  = async (prices: typeof ListCurrencies): Promise<Partial<TokenData>> => {

  try{
    let TokenData = {} as TokenData

    const tokens = ["Draco", "Hydra"]

    for (const token of tokens) {
      const {data} = await axios.post<Mir4Response>(endpoint[token])
            
      if (data?.Data?.[`${token}Price`]) {
        
        const usdPrice = parseFloat(data?.Data?.[`USD${token}Rate`])
  
        TokenData[token.toLowerCase()] = {
          usd: usdPrice,
  
          ...ListCurrenciesArray.reduce((a,b) => {
            a[b] = a[b] || [0];
            a[b] = (usdPrice) * (prices[b] || 0)
            return a
          }, {}) as typeof ListCurrencies
        }      
      }
    }

    return TokenData
  }
  catch(err) {
    return {}
  }     

} 