import "./providers.controller"


process.on("uncaughtException", (error, origin ) => {
  /**
   *   console.log("catch supremo")

  try {
    console.error({
      name: error.name?.substr(0, 150),
      message: error.message?.substr(0, 150),
      stack: error.stack?.substr(0,150),
      origin: origin?.substr(0, 200)
    })
    
  } 
  catch (error) {
    
  }
   * 
   */


})