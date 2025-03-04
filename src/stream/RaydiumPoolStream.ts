import { BaseProvider } from "@bloxroute/solana-trader-client-ts";
import { SwapHandle, wallet } from "../Instruction/SwapHandle";
import { logger } from "../utils/logger";
import { Check } from "./check";
import { buyAmount, private_key, slippage, socialCheck, solToken, tokenLockCheck } from "../helpers/constants";
import { PublicKey } from "@solana/web3.js";
import { amount, token } from "@metaplex-foundation/js";
import { RaydiumPoolReserves } from "./RaydiumPoolReserves";

export class RaydiumPoolStream {
    private provider: BaseProvider;
    private handleSwap: SwapHandle;
    constructor(provider: BaseProvider) {
        this.provider = provider;
        this.handleSwap = new SwapHandle(provider);
    }
    public getRaydiumPoolStream = async () => {
        logger.info("Subscribing for new pool transactions in raydium")
        try {
            const req = await this.provider.getNewRaydiumPoolsStream({});
            let count = 0;
            for await (const tr of req) {
               
                await this.handleSwap.swap(solToken, outToken!, slippage, amount);
               
                // Get pool reserves and Trade
                const poolReserves = new RaydiumPoolReserves(this.provider);
                poolReserves.PoolReserves(data?.poolAddress!, tokenAmount?.settledAmount!);
                break;

            }
        } catch (error) {
            console.error("Error in Raydium pool stream:", error);
        }
    }
}