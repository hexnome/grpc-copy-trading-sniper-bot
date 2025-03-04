import {
    Keypair,
    PublicKey,
    Transaction,
    TransactionInstruction,
    MessageCompiledInstruction,
    VersionedTransaction,
    SystemProgram,
} from "@solana/web3.js"
import { bloXroute_fee } from "../helpers/constants"

// https://docs.bloxroute.com/solana/trader-api-v2/front-running-protection-and-transaction-bundle
const TRADER_API_TIP_WALLET = "HWEoBxYs7ssKuudEjzjmpfJVX7Dvi7wescFsVx2L5yoY"
const tipAmount = Number(bloXroute_fee) * (10 ** 9)

// createTraderAPIMemoInstruction generates a transaction instruction that places a memo in the transaction log
// Having a memo instruction with signals Trader-API usage is required
export class CreateTipInstruction {
    constructor() { };
    public createTipInstruction = (wallet: PublicKey) => {

        const tipAddress = new PublicKey(TRADER_API_TIP_WALLET)

        return SystemProgram.transfer({
            fromPubkey: wallet,
            toPubkey: tipAddress,
            lamports: tipAmount,
        })
    }
}