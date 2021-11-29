import {coinGeckoPrice} from "./providers/tokens/coingecko"
import {PancakeswapPrice} from "./providers/tokens/pancake"
import {FactoryChain} from "./providers/tokens/factoryChain"
import {Mir4} from "./providers/tokens/mir4"
import {ApeSwapWeb3Client} from "./providers/tokens/apeswap"

import { TokenData } from "./types";



let TokenPricesList = {} as TokenData

;(async() => {


  const Token = new ApeSwapWeb3Client({
    network: "bscscan",
    refreshBnbInSeconds: 15
  })

  console.log(await Token.getPriceBUSDBased("0xcf2D2CE89AeD0073540C497fcF894Ea22d37C7aF"))


  console.log(await Mir4({
    prices: {
      brl: 5.50,
      php: 30
    }
  }))


})();