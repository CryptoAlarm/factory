import axios from "axios";
import { TokenData, Providers, Tokens, TokensReduce } from "./types/token";
import { ProvidersMap, ProvidersConfig } from "./providers.map";

let TokenPricesList = {} as TokenData;

(async () => {
  const endpoint = "";

  const { data } = await axios.get<Tokens[]>(endpoint);

  const Tokens = data.reduce((tokens, current) => {
    tokens[current.api] = tokens[current.api] || [];

    tokens[current.api].push({
      contract: current.contract,
      ref: current.ref,
    });

    return tokens;
  }, {} as TokensReduce);

  Object.keys(Tokens).map(async (key: Providers) => {
    if (key !== "coingecko") {
      Tokens[key]?.map(async (token) => {
        try {
          const price = await ProvidersMap[key].call(this, token)
          TokenPricesList = { ...TokenPricesList, ...price }

        } catch (error) {}
      })
    } else if (key === "coingecko") {
      try {
        const refList = Tokens[key]?.map((token) => token.ref)

        let response = await ProvidersMap[key].call(this, { refList })


        if (Object.keys(response).length) {
          TokenPricesList = { ...TokenPricesList, ...response }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
})();
