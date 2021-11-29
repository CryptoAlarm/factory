import {coinGeckoPrice} from "./providers/coingecko"
import {PancakeswapPrice} from "./providers/pancake"
import {FactoryChain} from "./providers/factoryChain"
import {Mir4} from "./providers/mir4"




;(async() => {



  console.log(await Mir4({
    prices: {
      brl: 5.50,
      php: 30
    }
  }))


})();