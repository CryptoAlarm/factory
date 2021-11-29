import {coinGeckoPrice} from "./providers/tokens/coingecko"
import {PancakeswapPrice} from "./providers/tokens/pancake"
import {FactoryChain} from "./providers/tokens/factoryChain"
import {Mir4} from "./providers/tokens/mir4"

import { TokenData } from "./types";



let TokenPricesList = {} as TokenData

;(async() => {



  console.log(await Mir4({
    prices: {
      brl: 5.50,
      php: 30
    }
  }))


})();