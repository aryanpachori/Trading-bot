import { DepthManager } from "./depth";

const SOLinrMarkets = new DepthManager("https://public.coindcx.com/market_data/orderbook?pair=B-SOL_INR")
const USDTinrMarkets = new DepthManager("https://public.coindcx.com/market_data/orderbook?pair=B-USDT_INR")
const SOLusdtMarkets = new DepthManager("https://public.coindcx.com/market_data/orderbook?pair=B-SOL_USDT")
