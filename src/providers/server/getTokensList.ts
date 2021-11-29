import axios from "axios"

import "dotenv/config"
import serverAPI from "./api"


export const getTokensList = () => {

  serverAPI.get("/getPrice")
}