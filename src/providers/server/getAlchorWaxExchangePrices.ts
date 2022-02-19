import { waxEndPoint, AlchorExchangeInfo, AlchorExchangeSetup, ApiResponse} from "../../config/token/wax"
import axios from "axios"


const seconds = (ms: number) => ms * 1000
const minutes = (ms: number) => ms * 1000 * 60


export function getAlchorWaxExchangePrices () { return AlchorExchangeSetup }


async function alchorWaxExchangeApi (contract: AlchorExchangeInfo) {

  try {
    const currentDate = Date.now() / 1000
    const params = `from=${currentDate - minutes(10)}&to=${currentDate}`

    const {data} = await axios.get<ApiResponse[]>(waxEndPoint(contract.id) + params)

    const alchorWaxExchangeApiResponse = data[data.length-1]

    if (alchorWaxExchangeApiResponse._id) {
      contract.value = alchorWaxExchangeApiResponse.close
    }

  } catch (error) { }
};


setTimeout(() => {
  for (const key in AlchorExchangeSetup) {
    setTimeout(async () => {
      const contract = AlchorExchangeSetup[key]
      await alchorWaxExchangeApi(contract)
    }, seconds(5)); 
  }
}, seconds(5));

setInterval(() => {

  for (const key in AlchorExchangeSetup) {
    setTimeout(async () => {
      const contract = AlchorExchangeSetup[key]
      await alchorWaxExchangeApi(contract)
    }, seconds(5)); 
  }

}, minutes(5))