
interface SwapProps {
  amount0In: string
  amount0Out: string
  amount1In: string
  amount1Out: string
  amountUSD: string

  to: string 

  pair: {
    token0: {
      id: string 
      symbol: string 
      _typename: string 
    },
    token1: {
      id: string 
      symbol: string 
      _typename: string 
    },
    __typename: string
  }

  transaction: {
    id: string 
    timestamp: string 
    __typename: string
  },
  __typename: string
}

interface TransactionsProps {
  burns: unknown[],
  mints: unknown[],
  swaps: SwapProps[],
  __typename: string
}
export interface FactorychainResponse {
  data: {
    transactions: TransactionsProps[]
  }
}


export interface FactoryChainProps {

  prices: {
    brl: number,
    php: number
  }

}