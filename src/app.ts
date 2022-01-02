import "./providers.controller"


process.on("uncaughtException", (error, origin ) => {

  console.log("catch supremo")
  console.log(error, origin)
})