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
    setInterval(() => [this.pollmarkets()], 3000);
  }

  async pollmarkets() {
    const depth = await axios.get(
      `https://public.coindcx.com/market_data/orderbook?pair=${this.market}`
    );
    this.bids = depth.data.bids;
    this.asks = depth.data.asks;
  }
}
