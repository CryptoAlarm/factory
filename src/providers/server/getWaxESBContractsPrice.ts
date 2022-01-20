import { waxEndPoint, } from "../../config/token/wax"
import axios from "axios"

interface ApiResponse {
  _id: string
  volume: number
  open: number
  high:number
  low: number
  close: number
  time: number
}
let EsbInWax = 0

const _1hour = 1000 * 60 * 10 

export function getEsbPriceInWax () {
  return EsbInWax
}
async function breedersZone () {

  try {
    const currentDate = Date.now() / 1000
    const params = `from=${currentDate - _1hour}&to=${currentDate}`

    const {data} = await axios.get<ApiResponse[]>(waxEndPoint + params)

    const esbcontractvalue = data[data.length-1]

    if (esbcontractvalue._id) {
      EsbInWax = esbcontractvalue.close
    }

  } catch (error) { }
};


setTimeout(breedersZone, 1000)
setInterval(breedersZone, 1000 * 60 * 5)