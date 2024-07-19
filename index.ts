import { DepthManager } from "./depth";
import { CancelAll, createOrder } from "./order";

const XAIinrMarkets = new DepthManager("B-XAI_INR");
const USDTinrMarkets = new DepthManager("B-USDT_INR");
const XAIusdtMarkets = new DepthManager("B-XAI_USDT");

setInterval(() => {
  //SELL XAI FOR INR -> BUY USDT FROM INR  -> BUY XAI FROM USDT
  const getINR = XAIinrMarkets.getReleventDepth().lowestAsk - 0.001;
  const getUSDT = getINR / USDTinrMarkets.getReleventDepth().lowestAsk;
  const getXAI = getUSDT / XAIusdtMarkets.getReleventDepth().lowestAsk;
  console.log(`You can convert ${1} XAI into ${getXAI} XAI`);

  // 2nd Approach - BUY XAI FRM INR -> SELL XAI FOR USDT  -> USDT TO INR
  const getXAI2 = XAIinrMarkets.getReleventDepth().highestBid+0.001;
  const sellXAI = XAIusdtMarkets.getReleventDepth().highestBid;
  const getINR2 = sellXAI*USDTinrMarkets.getReleventDepth().highestBid;
  console.log(`You can convert ${getXAI2} INR into ${getINR2} INR`);
}, 3000);

async function main() {
    const highestBid = XAIinrMarkets.getReleventDepth().highestBid;
    console.log(`placing order for ${parseFloat(highestBid) + 0.01}`);
    await createOrder("buy", "XAIINR", (parseFloat(highestBid) + 0.01).toFixed(3), 10, Math.random().toString())
    await new Promise((r) => setTimeout(r, 10000));
    await CancelAll("XAIINR");
    await new Promise((r) => setTimeout(r, 1000));
    main();
}

setTimeout(async () => {
    main();
}, 2000)