

export interface blockChainConfig {
  tokensToSell: number;
}

export type Currency = "usd"
export type subCurrency =  "brl" | "php"
export type Network = "eth_mainnet" | "bscscan"

export interface TokenPriceConfig {

  network: Network;
  
  refreshBnbInSeconds?: number;
}