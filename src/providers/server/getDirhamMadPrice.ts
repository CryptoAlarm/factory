import axios from "axios"

let MADPrice = 0;


const fetchDirhamMadPrice = async () => {
  try {
    
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
