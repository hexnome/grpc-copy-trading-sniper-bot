import { clusterApiUrl } from "@solana/web3.js";
import "dotenv/config";

export const endpoint =
  process.env.MAINNET_ENDPOINT || clusterApiUrl("mainnet-beta");

export const private_key = process.env.PRIVATE_KEY || ""; // your private key
export const dev_endpoint = process.env.DEVNET_ENDPOINT || ""; // devnet endpoint, if you use devnet
export const main_endpoint = process.env.MAINNET_ENDPOINT || ""; // mainnet endpoint
export const bloXRoute_auth_header = process.env.BLOXROUTE_AUTH_HEADER;
export const bloXroute_fee = process.env.BLOXROUTE_FEE; // 0.001 SOL

export const targetWallet = process.env.TARGET_WALLET || "";
export const tokenDistribuionCheck = process.env.TOKEN_DISTRIBUTION_CHECK || undefined;
export const tokenLockCheck = process.env.TOKEN_LOCK_CHECK || undefined;
export const socialCheck = process.env.SOCIAL_CHECK || undefined;
export const SOLANA_RPC = process.env.SOLANA_RPC || "";

export const takeprofit = Number(process.env.TAKE_PROFIT) || 0;
export const stoploss = Number(process.env.STOP_LOSS) || 0;

export const tokenDelayTime = process.env.TOKEN_DELAY_TIME || "0";

export const slippage = Number(process.env.SLIPPAGE);
export const computeLimit = process.env.COMPUTE_LIMIT;
export const computePrice = process.env.COMPUTE_PRICE || "";
export const tip = process.env.TIP || ""
export const buyAmount = Number(process.env.Amount) || 0

export const solToken = process.env.SOL_TOKEN || "";
