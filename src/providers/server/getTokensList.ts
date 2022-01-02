import { Tokens } from "../../types/server/token";
import {endpoint} from "../../config/server/server"
import api from "./api"


export const getTokensList = async (): Promise<Tokens[]> => {
  try {
    const { data } = await api.get<Tokens[]>(`${endpoint}/private/tokensList`)    
    return data
  } 
  catch (error) {
    return [] 
  }
}


