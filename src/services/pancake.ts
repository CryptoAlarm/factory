
import {endpoint } from "../config/pancake"

import axios from "axios"
import { TokenData, PancakeswapProps,PancakeResponse } from "../types"

function insert(str: string, index: number, value: string) {
  return str.substr(0, index) + value + str.substr(index);
}


export const PancakeswapPrice = async (props: PancakeswapProps): Promise<Partial<TokenData>>  => {
  
  try {      
    let TokenData = {}

    const {contract, ref } = props

    let {data: response} = await axios.get<PancakeResponse>(`${endpoint}${contract}`)

    if (! response.updated_at) {
      throw Error("Unknow address")
    }

    let price = 0;

   
  
    if (response.data.name === "unknown" || 
        response.data.symbol === "unknown") 
    {
      /**
       * Sometimes pancake swap response is wrong formated, 
       * that means decimal part isn't splitted yet.
       * Usually you use 18 decimal parts in BSC.       
       */

      let temp = response.data.price.split(".")[1] || ""
      price = parseFloat(insert(temp, 18, ".")) 
    }

    else {
      price = parseFloat(response.data.price)
    }

   
    TokenData[ref] = {     
      brl: price * (props.prices.brl || 0),
      php: price * (props.prices.php || 0),
      usd: price

    }

    return TokenData
  
  } catch (error) {

    console.log(error)
    
    return {}
  }
}
  