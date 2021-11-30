/*const __Currencies = <const>['brl', 'usd', 'php', 'eur', 'gdp']
const builder = __Currencies;
export type Currencies = typeof builder[number];*/
export const ListCurrencies = {
  brl: 0,
  usd: 0,
  php: 0,
  eur: 0,
  gbp: 0,
  btc: 0
}


export type Currencies = keyof typeof ListCurrencies
export interface TokenData {
  [key: string]: {
    [key in Currencies]: number
  }
}

export const ListCurrenciesArray = Object.keys(ListCurrencies) as Currencies[]

export type Providers =
  | "apeswap"
  | "mir4"
  | "factorychain"
  | "pancakeswap"
  | "coingecko";

export interface Tokens {
  ref: string;
  contract: string;
  api: Providers;
}

export type TokensReduced = {
  [key in Providers]: Partial<Tokens>[];
};


/**
 * Example 
 */
export const data: Tokens[] = [
  {
    api: "pancakeswap",
    contract: "0x339c72829abd45c3c52f965e7abe358dd8761e",
    ref: "wanaka-farm",
  },
  {
    api: "pancakeswap",
    contract: "0x00e1656e45f18ec6747f5a8496fd39b50b38396d",
    ref: "bombcrypto",
  },
  {
    api: "mir4",
    contract: "",
    ref: "draco",
  },
  {
    api: "coingecko",
    contract: "",
    ref: "ethereum",
  },
  {
    api: "coingecko",
    contract: "",
    ref: "bitcoin",
  },
  {
    api: "coingecko",
    contract: "",
    ref: "cardano",
  },
  {
    api: "mir4",
    contract: "",
    ref: "draco",
  },
  {
    api: "factorychain",
    contract: "",
    ref: "fpvu",
  },
  {
    api: "coingecko",
    contract: "",
    ref: "binance-usd",
  },
]