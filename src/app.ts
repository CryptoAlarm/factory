import {coinGeckoPrice} from "./services/coingecko"
import {PancakeswapPrice} from "./services/pancake"




;import { CoingeckoResponse } from "./types";
(async() => {


  console.log(await   coinGeckoPrice(["wanaka-farm"]))


  console.log(await PancakeswapPrice({
    contract: "0x0feb3bdf0d619191a25bfae0b8069164511cd8c9",
    ref: "fishytank",
    prices: {
      brl: 5.50,
      php: 30,
    }
  }))


})();