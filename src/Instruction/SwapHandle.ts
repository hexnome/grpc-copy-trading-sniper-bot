import { BaseProvider } from "@bloxroute/solana-trader-client-ts";
import { Keypair } from "@solana/web3.js";
import base58 from "bs58";
import { SOLANA_RPC, buyAmount, private_key } from "../helpers/constants";
import { ComputeBudgetProgram } from "@solana/web3.js";
import { Transaction } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import { logger } from "../utils/logger";
import TelegramBot from "node-telegram-bot-api";

export const wallet = Keypair.fromSecretKey(base58.decode(private_key));
const connection = new Connection(SOLANA_RPC, "processed");


export class SwapHandle {
    private provider: BaseProvider;
    constructor(
        provider: BaseProvider,
    ) {
        this.provider = provider;
    }
    public swap = async (inToken: string, outToken: string, slippage: number, amount: number) => {
        try {
            
            await this.executeTx(buyTx);
        } catch (error) {
            console.log("Buy Transaction-->", error)
            throw new Error("Buy error")
        }
    }
    public executeTx = async (transaction: Transaction) => {
        try {
            
            if (response.signature) {

                logger.info(`✅ txn landed successfully\nSignature: https://solscan.io/tx/${response.signature}`)
            } else {
                console.log("❌ Transaction failed");
            }

        } catch (error) {
            logger.info('Error during transaction execution', error);
            throw new Error("error during Tx execution");
        }
    }
}