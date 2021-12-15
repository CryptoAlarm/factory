
import { data } from "../../types/server/token"
import {endpoint} from "../../config/server/server"
import api from "./api"


export const getTokensList = async () => {

 
  await api.post(`${endpoint}/setTokensPrices`)
  
  return data
}