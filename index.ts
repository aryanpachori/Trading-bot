import { DepthManager } from "./depth";

const XAIinrMarkets = new DepthManager("B-XAI_INR");
const USDTinrMarkets = new DepthManager("B-USDT_INR");
const XAIusdtMarkets = new DepthManager("B-XAI_USDT");

setInterval(() => {
 
  //SELL XAI FOR INR -> BUY USDT FROM INR  -> BUY XAI FROM USDT
  const getINR = XAIinrMarkets.getReleventDepth().lowestAsk - 0.001;
  const getUSDT = getINR / USDTinrMarkets.getReleventDepth().lowestAsk;
  const getXAI = getUSDT / XAIusdtMarkets.getReleventDepth().lowestAsk;
  console.log(`You can convert ${1} XAI into ${getXAI} XAI`);
}, 3000);
