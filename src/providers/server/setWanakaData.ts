
import { TokenData } from "../../types/server/token"
import {endpoint} from "../../config/server/server"
import api from "./api"
import { LandsProps } from "../../types/tools/wanaka.marketplace"


export const setWanakaLands = async (Lands: LandsProps[]) => {
  try {
    api.post(`${endpoint}/private/tools/wanakafarm`,  Lands)
    return true
  } catch (error) { 
    console.log("Failed to push wanaka informations")
    return false 
  }

}