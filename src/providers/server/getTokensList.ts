import axios from "axios"

import "dotenv/config"
import { Tokens } from "../../types/server/token";
import serverAPI from "./api"
import {endpoint} from "../../config/server/server"
import { data } from "../../types/server/token"


export const getTokensList = async () => {

//  const { data } = await serverAPI.get<Tokens[]>(endpoint)
  
  return data
}