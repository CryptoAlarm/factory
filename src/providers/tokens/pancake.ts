
import {endpoint } from "../../config/token/pancake"
import { ListCurrenciesArray , ListCurrencies} from "../../types/server/token"

import axios from "axios"
import { TokenData, PancakeswapProps,PancakeResponse } from "../../types"

function insert(str: string, index: number, value: string) {
  return str.substr(0, index) + value + str.substr(index);
}


export const PancakeswapPrice = async (props: PancakeswapProps & typeof ListCurrencies):  Promise<Partial<TokenData>>  => {
  
  try {      
    let TokenData = {}

    let {contract, ref } = props

    contract = contract.toLowerCase()
    
    let {data: response} = await axios.get<PancakeResponse>(`${endpoint}${contract}`)

    if (! response.updated_at) {
      throw Error("Unknow address")
    }

    let value = 0;

    if (response.data.name === "unknown" || 
        response.data.symbol === "unknown" ) 
    {
      /**
       * Sometimes pancakeswap response is wrong formated, 
       * that means decimal part isn't splitted yet.
       * Usually you use 18 decimal parts in BSC.       
       * 
       * WARNING: if response is wrong formated and decimal parts isnt 18,
       * you should change below
       */
      const DECIMAL_PARTS = 18
      
      let temp = response.data.price.split(".")[1] || ""
      value = parseFloat(insert(temp, DECIMAL_PARTS, ".")) 
    }

    else {
      value = parseFloat(response.data.price)
    }

    if (!value) throw new Error ("There isn't value in " + ref)
   
    TokenData[ref] = {     
      usd: value,

      ...ListCurrenciesArray.reduce((a,b) => {
        a[b] = a[b] || [0];
        a[b] = value * (props[b] || 0)
        return a
      }, {})
    }

    return TokenData
  
  } catch (error) {
    
    return {}
  }
}
  