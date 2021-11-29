
import axios from "axios"

import {endpoint} from "../config/mir4"


import {Mir4Props, Mir4Response, TokenData} from "../types"

export const Mir4  = async (props: Mir4Props): Promise<Partial<TokenData>> => {

  try{
    let TokenData = {} as TokenData

    const response = await axios.post<Mir4Response>(endpoint)
            
    if (response.data?.Data?.DracoPrice) {

      const dracoInWemix = parseFloat(response.data?.Data?.DracoPrice)
      const USDWemixRate = parseFloat(response.data?.Data?.USDWemixRate)  
      const USDdracoPrice = dracoInWemix * USDWemixRate;

      TokenData["draco"] = {
        usd: USDdracoPrice,
        brl: USDdracoPrice * (props.prices.brl || 0),
        php: USDdracoPrice * (props.prices.php || 0),
      }      
    }

    return TokenData
  }
  catch(err) {
    return {}
  }     

} 