import { PublicKey } from "@solana/web3.js"
import { slippage, targetWallet } from "../helpers/constants";
import { BaseProvider } from "@bloxroute/solana-trader-client-ts";
import { logger } from "../utils/logger";
import { logError } from "@metaplex-foundation/js";
import { SwapHandle } from "../Instruction/SwapHandle";

export class RaydiumSwapStream {
    private targetWallet: string;
    private provider: BaseProvider;
    private handleSwap: SwapHandle;
    constructor(provider: BaseProvider) {
        this.provider = provider;
        this.targetWallet = targetWallet;
        this.handleSwap = new SwapHandle(provider);
    }
    public raydiumSwapStream = async () => {
        try {
            logger.info(`Subscribing for raydium swap transactions`)
            logger.info(`Target Wallet : ${this.targetWallet}`)
            const req = await this.provider.getSwapsStream({
                projects: ["P_RAYDIUM"],
                pools: [
                    "A74BZ7x7n8nDeywxxgFd1ocBrqrvcKHKikvumCEr7rFd",
                    "dS2YRSVmRU338PmzVHyWFSqEHx2yNCcvGiwrLxZfsJ8"
                ],
                includeFailed: false
            });
            for await (const tr of req) {
               

                if (this.targetWallet == data?.ownerAccount) {
                    logger.info(`Target Wallet : ${data?.ownerAccount}`);
                    this.handleSwap.swap(data?.inTokenAddress!, data?.outTokenAddress!, slippage, data?.inAmount!)
                }
            }
        } catch (error) {
            throw new Error("CopyTraidng Error")
        }
    }
}