import axios from "axios"

import "dotenv/config"
import { Tokens } from "../../types/server/token";
import {endpoint} from "../../config/server/server"
import api from "./api"


export const getTokensList = async () => {

  const { data } = await api.get<Tokens[]>(`${endpoint}/getTokensList`)  
  
  return data
}


