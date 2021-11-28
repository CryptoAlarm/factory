

const buildEndpointURL = (token: string): string => {
  return (
    coinGeckoApiURL + "/price?ids=" + token + "&vs_currencies=" + currencyList
  );
};

export const coinGeckoPrice = async (
  token: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildEndpointURL(token));
    const data = response.data;

    if (!data) return {};

   


    return data;

  } catch (error) {
    console.log("Failed to request endpoint: " + buildEndpointURL(token));

    return {};
  }
};
