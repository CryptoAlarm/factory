
export interface Mir4Props {

  prices: {
    brl: number,
    php: number
  }

}

export interface Mir4Response {
  Code: number
  Data: {
    CreatedDT: string
    DracoAmount: string
    DracoAmountPrev: string
    DracoPrice: string
    DracoPriceKlay: string
    DracoPricePrev: string
    DracoPriceWemix: string
    USDDracoRate: string
    USDDracoRatePrev: string
    USDKLAYRate: string
    USDWemixRate:string
    USDWemixRatePrev: string
  }
 
}