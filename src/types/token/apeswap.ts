

export interface blockChainConfig {
  tokensToSell: number;
}
export type Network = "eth_mainnet" | "bscscan"

export interface TokenPriceConfig {

  network: Network;
  
  refreshBnbInSeconds?: number;
}