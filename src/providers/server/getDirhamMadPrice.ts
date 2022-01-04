import axios from "axios"

let MADPrice = 0;

const fetchDirhamMadPrice = async () => {
  try {
    const { data } = await axios.get("https://freecurrencyapi.net/api/v2/latest?apikey=bc914540-6d88-11ec-8949-859ee4de1412") 
    
    if (typeof data.data["MAD"] === "number") {
      MADPrice = data.data["MAD"]
    }
  
  } 
  catch (error) { }
}

export const getDirhamMadPrice = (): number => {
  if (typeof MADPrice === "number") {
    return MADPrice
  }
  else return 0  
}


setTimeout(fetchDirhamMadPrice, 1000)
setInterval(fetchDirhamMadPrice, 1000 * 60 * 5)
