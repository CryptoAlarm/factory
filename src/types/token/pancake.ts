
export interface PancakeswapProps {
  contract: string
  ref: string //bot name reference

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