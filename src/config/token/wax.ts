export const waxEndPoint = (id: string | number) => `https://wax.alcor.exchange/api/markets/${id}/charts?resolution=240&`
export const AlchorExchangeSetup = {
  CFB: {
    id: 397,
    value: 0,
    ref: "CFB",  
  },
  CFE: {
    id: 398,
    value: 0,
    ref: "CFE",  
  },
  CFP: {
    id: 399,
    value: 0,
    ref: "CFP",  
  },
  ESB: {
    id: 159,  
    value: 0,
    ref: "esbcontracts"
  },
  FWW: {
    id: 104,
    value: 0,
    ref: "FWW"
  },
  FWG: {
    id: 106,
    value: 0,
    ref: "FWG"
    
  },
  FWF: {
    id: 105,
    value: 0,
    ref: "FWF",    
  },
  GMM: {
    id: 339,
    value: 0,
    ref: "GMM",  
  },
  GME: {
    id: 337,
    value: 0,
    ref: "GME",  
  },
  GMF: {
    id: 338,
    value: 0,
    ref: "GMF",  
  },
  GMD: {
    id: 340,
    value: 0,
    ref: "GMD",  
  }
} as AlchorExchangeSetup

export interface ApiResponse {
  _id: string
  volume: number
  open: number
  high:number
  low: number
  close: number
  time: number
}
export type AlchorExchangeInfo ={
  id: number,
  value: number
  ref: string
}
export interface AlchorExchangeSetup {
  [key: string]: AlchorExchangeInfo
}
