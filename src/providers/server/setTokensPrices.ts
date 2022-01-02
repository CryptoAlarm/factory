
import { TokenData } from "../../types/server/token"
import {endpoint} from "../../config/server/server"
import api from "./api"


export const setTokensPrices = async (tokenData: TokenData) => {
  try {
    await api.post(`${endpoint}/private/historyPrices`,  tokenData)
    return true
  } catch (error) { 
    console.log(error)
    return false 
  }

}