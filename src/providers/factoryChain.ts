import axios from "axios";
import {FactorychainResponse, FactoryChainProps, TokenData} from "../types"
import {endpoint, query} from "../config/factoryChain"



export const FactoryChain = async (props: FactoryChainProps): Promise<Partial<TokenData>> => {
 
  try {
    let TokenData = {} as TokenData

    const response = await axios.post<FactorychainResponse>(endpoint, query)

    const ___data = response.data?.data

    if (!___data) {
      throw new Error("Failed to fetch factorychain graphql");      
    }

    let index = -1

    for (let i = 0; i < ___data.transactions?.length; i++) {
      let data = ___data.transactions[i].swaps[0]

      let token0 = data.pair.token0.symbol
      let token1 = data.pair.token1.symbol

      if ((token1 === "FPVU" && token0 === "FUSD") || (token1 === "FUSD" && token0 === "FPVU")){
        index = i
        break
      }

      if (i > 10) break
    }

    if (index == -1) {
      throw new Error("Inst about fpvu or fusd")
    }

    let data = ___data.transactions[index].swaps[0]


    let token0 = data.pair.token0.symbol
    let token1 = data.pair.token1.symbol
    
    if (!data) {
      throw new Error("Failed to fetch factorychain graphql v2");      
    }

    if (token1 === "FUSD") {
      
      //Se o token1 é FUSD e a entrada foi zero, ELE COMPROU FPVU
      if (data.amount1In == "0" && data.amount1Out != "0") {
        
        //Como o token1 é FUSD, a evidência está sempre em cima do dolar

        let fusd = parseFloat(data.amount1Out)
        let fpvu = parseFloat(data.amount0In)

        

        TokenData["fpvu"] = {
          usd: ((fusd / fpvu)),
          brl: ((fusd / fpvu)) * (props.prices.brl || 0),
          php: ((fusd / fpvu)) * (props.prices.php || 0)
        }
      }
    
      //Se o token1 é FUSD e a saida foi zero, ELE VENDEU FPVU
      else if (data.amount1Out == "0" && data.amount1In != "0") {
              
        let fusd = parseFloat(data.amount1In)
        let fpvu = parseFloat(data.amount0Out)

        TokenData["fpvu"] = {
          usd: ((fusd / fpvu)),
          brl: ((fusd / fpvu)) * (props.prices.brl || 0),
          php: ((fusd / fpvu)) * (props.prices.php || 0)
        }
      }
    }

    else if (token1 === "FPVU") {
      //Se o token1 é FUSD e a entrada foi zero, ELE VENDEU FPVU
      if (data.amount1In == "0" && data.amount1Out != "0") {
                          
        let fusd = parseFloat(data.amount0In)
        let fpvu = parseFloat(data.amount1Out)

        TokenData["fpvu"] = {
          usd: ((fusd / fpvu)),
          brl: ((fusd / fpvu)) * (props.prices.brl || 0),
          php: ((fusd / fpvu)) * (props.prices.php || 0)
        }
      }
      //Se o token1 é FUSD e a saida foi zero, ELE COMPROU FPVU
      else if (data.amount1Out == "0" && data.amount1In != "0") {
              
        let fusd = parseFloat(data.amount0Out)
        let fpvu = parseFloat(data.amount1In)

        TokenData["fpvu"] = {
          usd: ((fusd / fpvu)),
          brl: ((fusd / fpvu)) * (props.prices.brl || 0),
          php: ((fusd / fpvu)) * (props.prices.php || 0)
        }
      }
    }

    return TokenData

  } catch (error) {
    
    return {}
  }


  

}