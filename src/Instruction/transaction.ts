import { BaseProvider } from "@bloxroute/solana-trader-client-ts";
import { computeLimit, computePrice, private_key, slippage, solToken, tip } from "../helpers/constants";
import base58 from "bs58"
import { Transaction } from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import fs from "fs"
import { TransactionInstruction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

const keypair = Keypair.fromSecretKey(base58.decode(private_key));
const BX_MEMO_MARKER_MSG = "Powered by bloXroute Trader Api"
const TRADER_API_MEMO_PROGRAM = "HQ2UUt18uJqKaQFJhgV9zaTdQxUZjNrsKFgoEDquBkcx"

export const buyOrder = async (provider:BaseProvider,symbol: string, amount: number) => {
    console.log("🤖 Placing buy order for token", symbol);
    console.log("slippage", slippage)
    console.log("amount", amount)
    console.log("wallet-->", keypair.publicKey.toString())
    try {
        
        const order = await provider.submitTradeSwap({
            ownerAddress: keypair.publicKey.toString(),
            inToken: solToken,
            outToken: symbol,
            inAmount: amount,
            slippage: Number(slippage),
            project: "P_RAYDIUM",
            computeLimit: Number(computeLimit),
            computePrice: computePrice,
            tip: tip
        }, "P_SUBMIT_ALL", true);
        console.log("order-->",order)
        // const memo = createTraderAPIMemoInstruction("");
        // const latestBlockhash = await provider.getRecentBlockHash({});

        // let transaction = new Transaction({
        //     recentBlockhash: latestBlockhash.blockHash,
        //     feePayer: keypair.publicKey,
        // })

        // transaction = transaction.add(memo);

        // transaction.sign(keypair);
        // const serializeTxBytes = transaction.serialize();
        // const buff = Buffer.from(serializeTxBytes);
        // const encodedTxn = buff.toString("base64");
        // const response = await provider.postSubmit({
        //     transaction: { content: encodedTxn, isCleanup: false },
        //     skipPreFlight: false
        // })

        // if (response.signature) {
        //     console.log('✅ Transaction Submitted successfully')
        //     console.log('✅ Transaction Signature:', response.signature)
        //     console.log(`✅ Buy Order placed successfully\nSignature: https://explorer.solana.com/tx/${response.signature}`)
        // } 

        logTransaction(order);
        return order;
    } catch (error) {
        console.error(`❌ Error placing buy order for ${symbol}:`, error);
        return null;
    }
}

export const sellOrder = async (provider:BaseProvider,symbol: string, amount: number) => {
    console.log("🤖 Placing sell order for token", symbol)

    if (symbol === symbol && symbol !== solToken ) {
        try {
            const order = await provider.submitTradeSwap({
                ownerAddress: keypair.publicKey.toString(),
                inToken: symbol,
                outToken: solToken,
                inAmount: amount,
                slippage: Number(slippage),
                project: "P_RAYDIUM",
                computeLimit: Number(computeLimit),
                computePrice: computePrice,
                tip: tip
            }, "P_SUBMIT_ALL", true);

            const memo = createTraderAPIMemoInstruction("");
            const latestBlockhash = await provider.getRecentBlockHash({});
    
            let transaction = new Transaction({
                recentBlockhash: latestBlockhash.blockHash,
                feePayer: keypair.publicKey,
            })
    
            transaction = transaction.add(memo);
    
            transaction.sign(keypair);
            const serializeTxBytes = transaction.serialize();
            const buff = Buffer.from(serializeTxBytes);
            const encodedTxn = buff.toString("base64");
            const response = await provider.postSubmit({
                transaction: { content: encodedTxn, isCleanup: false },
                skipPreFlight: false
            })
    
            if (response.signature) {
                console.log('✅ Transaction Submitted successfully')
                console.log('✅ Transaction Signature:', response.signature)
                console.log(`✅ Sell Order placed successfully\nSignature: https://explorer.solana.com/tx/${response.signature}`)
            } 
    
            logTransaction(order);
            return order;
        } catch (error) {
            console.error("❌ Error while occurred placing buy order:", error);
        }
    } else {
        return null;
    }
}

export const logTransaction = (transaction: any) => {
    fs.appendFileSync('transaction.log', JSON.stringify(transaction) + "\n");
}

export function createTraderAPIMemoInstruction(
    msg: string
): TransactionInstruction {
    if (msg == "") {
        msg = BX_MEMO_MARKER_MSG
    }
    return new TransactionInstruction({
        keys: [],
        programId: new PublicKey(TRADER_API_MEMO_PROGRAM),
        data: Buffer.from(msg),
    })
}