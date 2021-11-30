import Web3 from "web3";
import { Contract } from "web3-eth-contract";

import {
  tokenAbi,
  apeswapAbi,
  apeswapContract,
} from "../../config/token/apeswap";

import {
  BNBTokenAddress,
  USDTokenAddress,
  BscscanEndpoint,
} from "../../config/token/bscscan";

import { TokenPriceConfig, blockChainConfig } from "../../types";

export class ApeSwapWeb3Client {

  /**
   * Web3 client to access ethereum network
   */
  #web3: Web3;
  #ApeswapContract: Contract;

  /**
   * Bnb price that will be used to calculate price of each token.
   * BNB contract: 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
   * BUSD contract: 0xe9e7cea3dedca5984780bafc599bd69add087d56
   */
  #bnbPrice: number = 0;

  /**
   * Class constructor params
   */
  #config: TokenPriceConfig;

  /**
   * Web3 ethereum basic configs
   */
  #blockChainConfig: blockChainConfig;

  constructor(config: TokenPriceConfig, blockChainConfig?: blockChainConfig) {
  
     /**
     * Creating Web3 class object
     * endpoint: https://bsc-dataseed1.binance.org
     */    
    const __web3 = this.#web3 =  new Web3(BscscanEndpoint);

    /**
     * Build contract to use with SmartChain
     */
    this.#ApeswapContract = new __web3.eth.Contract(
      apeswapAbi,
      apeswapContract
    );

    /**
     * @param tokensToSell
     * Ammount of tokens to estimate bnb price. Default value = 1
     */
    this.#blockChainConfig = {
      tokensToSell: blockChainConfig?.tokensToSell || 1,
    };

    /**
     * @param refreshBnbInSeconds: 3
     * Time in seconds till refresh BNB price. Default value = 3
     */
    this.#config = {
      refreshBnbInSeconds: config?.refreshBnbInSeconds || 3,
      network: config?.network || "bscscan",
    };

    this.#fetchBnbPrice().then((bnb) => (this.#bnbPrice = bnb));

    setInterval(
      this.#setIntervalBnb,
      (config?.refreshBnbInSeconds || 3) * 1000
    );
  }

  #setIntervalBnb = async (): Promise<void> => {
    this.#bnbPrice = await this.#fetchBnbPrice();
  };

  #setDecimals = (__number: number, decimals: number): string => {
    let number = __number.toString();

    let numberAbs = number.split(".")[0];
    let numberDecimals = number.split(".")[1] ? number.split(".")[1] : "";
    while (numberDecimals.length < decimals) {
      numberDecimals += "0";
    }
    return numberAbs + numberDecimals;
  };

  #fetchBnbPrice = async (): Promise<number> => {
    let bnbToSell = this.#web3.utils.toWei("1", "ether");

    let amountOut;
    try {
      amountOut = await this.#ApeswapContract.methods
        .getAmountsOut(bnbToSell, [BNBTokenAddress, USDTokenAddress])
        .call();

      amountOut = this.#web3.utils.fromWei(amountOut[1]);
    } catch (error) {}
    if (!amountOut) return 0;
    return amountOut;
  };

  #fetchTokenPrice = async (tokens: number, tokenAddress: string): Promise<number> => {
    let tokenRouter = new this.#web3.eth.Contract(tokenAbi, tokenAddress);
    let tokenDecimals = await tokenRouter.methods.decimals().call();

    const tokensToSell = this.#setDecimals(tokens, tokenDecimals);

    let amountOut;

    try {
      amountOut = await this.#ApeswapContract.methods
        .getAmountsOut(tokensToSell, [tokenAddress, USDTokenAddress])
        .call();

      amountOut = this.#web3.utils.fromWei(amountOut[1]);
    } catch (error) {}

    if (!amountOut) return 0;

    return amountOut;
  }

  

  #getPriceMainnetNetwork = async (tokenAddress: string): Promise<number> => {
    // NEED TO FIND A WAY TO FETCH MAINNET ERC-20 coins
    return 0;
  }

  #getPriceSmartchainNetwork = async (
    tokenAddress: string
  ): Promise<number> => {
    let tokensToSell = 1;

    let fetchedPrice = await this.#fetchTokenPrice(tokensToSell, tokenAddress);

    return (fetchedPrice / tokensToSell);
  }

  getPriceBUSDBased = async (tokenAddress: string): Promise<number> => {
    if (this.#config.network === "bscscan") {
      if (this.#bnbPrice === 0) {
        this.#bnbPrice = await this.#fetchBnbPrice();
      }

      return await this.#getPriceSmartchainNetwork(tokenAddress);

    } else if (this.#config.network === "eth_mainnet") {
      return await this.#getPriceMainnetNetwork(tokenAddress);
    }

    return 0;
  }
  



  #fetchTokenPriceBasedBNBPRICE = async (tokens: number, tokenAddress: string): Promise<number> => {
    let tokenRouter = new this.#web3.eth.Contract(tokenAbi, tokenAddress);
    let tokenDecimals = await tokenRouter.methods.decimals().call();

    const tokensToSell = this.#setDecimals(tokens, tokenDecimals);

    let amountOut;

    try {
      amountOut = await this.#ApeswapContract.methods
        .getAmountsOut(tokensToSell, [tokenAddress, BNBTokenAddress])
        .call();

      amountOut = this.#web3.utils.fromWei(amountOut[1]);
    } catch (error) {}

    if (!amountOut) return 0;

    return amountOut;
  }


  #getPriceSmartchainNetworkBNBBased = async (
    tokenAddress: string
  ): Promise<number> => {
    let tokensToSell = 1;

    let fetchedPrice = await this.#fetchTokenPriceBasedBNBPRICE(tokensToSell, tokenAddress);

    return (fetchedPrice / tokensToSell) * this.#bnbPrice;
  }


  getPriceBNBBased = async (tokenAddress: string): Promise<number> => {
    if (this.#config.network === "bscscan") {
      if (this.#bnbPrice === 0) {
        this.#bnbPrice = await this.#fetchBnbPrice();
      }

      return await this.#getPriceSmartchainNetworkBNBBased(tokenAddress);

    } else if (this.#config.network === "eth_mainnet") {
      return await this.#getPriceMainnetNetwork(tokenAddress);
    }

    return 0;
  }
  

}
