import axios from "axios"

let MADPrice = 0;


const config = {
  /**
   * Free api key provided by https://freecurrencyapi.net <3
   * 50K requests / month
   */
  apiURL: "https://freecurrencyapi.net/api/v2/latest",
  apiKey: "bc914540-6d88-11ec-8949-859ee4de1412"
}

const fetchDirhamMadPrice = async () => {
  try {
    const { data } = await axios.get(`${config.apiURL}?apikey=${config.apiKey}`) 
    
    if (typeof data.data["MAD"] === "number") {
      MADPrice = data.data["MAD"]
    }
    else {
      console.log("wrong typeof ")
      console.log(data)
    }
  } 
  catch (error) { 
    console.log(error)
  }
}

export const getDirhamMadPrice = (): number => {
  console.log(MADPrice)
  if (typeof MADPrice === "number") {
    return MADPrice
  }
  else return 0  
}


setTimeout(fetchDirhamMadPrice, 1000)
setInterval(fetchDirhamMadPrice, 1000 * 60 * 5)
