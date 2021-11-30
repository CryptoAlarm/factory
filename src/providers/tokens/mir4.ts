
import axios from "axios"

import {endpoint} from "../../config/token/mir4"


import { Mir4Response, TokenData} from "../../types"
import { ListCurrencies, ListCurrenciesArray } from "../../types/server/token"

export const Mir4  = async (prices: typeof ListCurrencies): Promise<Partial<TokenData>> => {

  try{
    let TokenData = {} as TokenData

    const {data} = await axios.post<Mir4Response>(endpoint)
            
    if (data?.Data?.DracoPrice) {

      const dracoInWemix = parseFloat(data?.Data?.DracoPrice)
      const USDWemixRate = parseFloat(data?.Data?.USDWemixRate)  
      const USDdracoPrice = dracoInWemix * USDWemixRate;

      TokenData["draco"] = {
        usd: USDdracoPrice,

        ...ListCurrenciesArray.reduce((a,b) => {
          a[b] = a[b] || [0];
          a[b] = (USDdracoPrice) * (prices[b] || 0)
          return a
        }, {}) as typeof ListCurrencies
      }      
    }

    return TokenData
  }
  catch(err) {
    return {}
  }     

} 