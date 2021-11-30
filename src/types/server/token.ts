export interface TokenData {
  [key: string]: {
    brl: number;
    usd: number;
    php: number;
  };
}

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

export type TokensReduce = {
  [key in Providers]: Partial<Tokens>[];
};


export const data: Tokens[] = [
  {
    api: "pancakeswap",
    contract: "0x339c72829ab7dd45c3c52f965e7abe358dd8761e",
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
]