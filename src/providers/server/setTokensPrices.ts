
import { TokenData } from "../../types/server/token"
import {endpoint} from "../../config/server/server"
import api from "./api"


export const setTokensPrices = async (tokenData: TokenData) => {
  try {
    await api.post(`${endpoint}/private/historyPrices`,  tokenData)
    return true
  } catch (error) { 
    
    console.log(`Failed to setTokensPrice. `)
    console.error({
      name: error.name?.substr(0, 150),
      message: error.message?.substr(0, 150),
    })
    return false 
  }

}