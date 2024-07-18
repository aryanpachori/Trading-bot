import axios from "axios";

export class DepthManager {
  private market: string;
  private bids: {
    [key: string]: string;
  };
  private asks: {
    [key: string]: string;
  };
  constructor(market: string) {
    this.market = market;
    this.bids = {};
    this.asks = {};
    setInterval(() => {
      this.pollmarkets();
    }, 3000);
  }

  async pollmarkets() {
    const depth = await axios.get(
      `https://public.coindcx.com/market_data/orderbook?pair=${this.market}`
    );
    this.bids = depth.data.bids;
    this.asks = depth.data.asks;
  }

  getReleventDepth() {
    let highestBid = -100;
    let lowestAsk = 10000000;
    const BidPrices = Object.keys(this.bids).map((x) => parseFloat(x));
    const AskPrices = Object.keys(this.asks).map((x) => parseFloat(x));
    highestBid = Math.max(...BidPrices);
    lowestAsk = Math.min(...AskPrices);

    return {
      highestBid,
      lowestAsk,
    };
  }
}
