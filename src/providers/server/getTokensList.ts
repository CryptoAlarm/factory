import axios from "axios"

import "dotenv/config"
import serverAPI from "./api"


interface TokensProps{
  
  contract: string
  ref: string
  network: string
  isCoingecko: boolean
}
export const getTokensList = () => {

  serverAPI.get<TokensProps>("/getPrice")
}