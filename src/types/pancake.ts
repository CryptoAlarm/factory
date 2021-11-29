
export interface PancakeswapProps {
  contract: string
  ref: string //bot name reference

  prices: {
    brl: number,
    php: number
  }

}
export interface PancakeResponse {
  updated_at: number,
  data: {   
    price: string,
    price_BNB: string,
    symbol: string
    name: string
  }
}