import {
  WanakaMarketResponse,
  EndpointAPI,
  EndpointLand,
  LandApiResponse,
  NFTEntities,
  TransactionsResponse,
  TransactionsEntities,
  EndpointAPI2,
  NFTEntitiesV2,
  BigNumberParse,
  LandsProps
} from "../../types/tools/wanaka.marketplace";

import axios from "axios";



export const WanakaLandsInfo = async (landID: number): Promise<Partial<LandsProps>> => {
  try {
    const responseLand = await axios.get(`${EndpointLand}/${landID}`);
    const Land: LandApiResponse = responseLand.data;

    const responseNFT = await axios.post(EndpointAPI2, NFTEntitiesV2(landID));

    const data: WanakaMarketResponse = responseNFT.data.data.nftentities[0];

    if (!Land || !data) {
      throw Error("Failed to fetch data. Land " + landID);
    }

    let Attributes;

    if (!Land.attributes.length) {
      Attributes = {
        Rare: null,
        Spring: null,
        Summer: null,
        Autumn: null,
        Winter: null,
        IncreaseMutantRate: null,
        TimeReduce: null,
        Level: null,
        Birth: null,
      }
    } else {
      Attributes = {
        Rare: Land?.attributes?.[0].value?.toString() || null,
        Spring:
          Land?.attributes?.[1]?.value?.toString().includes("Spring") || null,
        Summer:
          Land?.attributes?.[1]?.value?.toString().includes("Summer") || null,
        Autumn:
          Land?.attributes?.[1]?.value?.toString().includes("Autumn") || null,
        Winter:
          Land?.attributes?.[1]?.value?.toString().includes("Winter") || null,

        IncreaseMutantRate: Number(Land?.attributes?.[2].value) || null,
        TimeReduce: Number(Land?.attributes?.[3].value) || null,
        Level: Number(Land?.attributes?.[4].value) || null,
        Birth: Number(Land?.attributes?.[5].value) || null,
      };
    }

    return {
      itemId: Land.itemId,

      ...Attributes,
      description: Land.description,
      external_url: Land.external_url,
      image: Land.image,
      isPacked: Land.isPacked,
      name: Land.name,

      owner: data.owner.address,

      wland_id: data.wland.id,
      wland_salePrice: data.wland.salePrice,
      wland_environment: data.wland.environment.id || null,
      activeOrder_price: BigNumberParse(data.activeOrder?.price || "") || null,
      activeOrder_id: data.activeOrder?.id || null,
      activeOrder_createdAt: data.activeOrder?.createdAt || null,
      activeOrder_category: data.activeOrder?.category || null,
      activeOrder_txHash: data.activeOrder?.txHash || null,
      activeOrder_status: data.activeOrder?.status || null,
      activeOrder_owner: data.activeOrder?.owner || null,
    }
    
  } catch (error) {
    
    return {}
  }
};
