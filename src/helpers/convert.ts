import {
    PublicKey, Keypair, Connection, Transaction, ComputeBudgetProgram,
    sendAndConfirmTransaction, VersionedTransaction, TransactionMessage,
    TransactionInstruction, SystemProgram,
} from "@solana/web3.js";
import {
    NATIVE_MINT, TOKEN_PROGRAM_ID, createAssociatedTokenAccountIdempotentInstruction,createCloseAccountInstruction, getAssociatedTokenAddress,
    createSyncNativeInstruction} from "@solana/spl-token";
import { endpoint, private_key } from "./constants";
import { BaseProvider } from "@bloxroute/solana-trader-client-ts";
import base58 from "bs58"

const mainKp = Keypair.fromSecretKey(base58.decode(private_key));
const commitmentLevel = "processed";
const connection = new Connection(endpoint, commitmentLevel);
export const wrapSol = async ( wsolAmount: number) => {
    try {
        const wSolAccount = await getAssociatedTokenAddress(NATIVE_MINT, mainKp.publicKey);
        const tx = new Transaction().add(
            ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 461197 }),
            ComputeBudgetProgram.setComputeUnitLimit({ units: 351337 }),
            createAssociatedTokenAccountIdempotentInstruction(
                mainKp.publicKey,
                wSolAccount,
                mainKp.publicKey,
                NATIVE_MINT,
            ),
            SystemProgram.transfer({
                fromPubkey: mainKp.publicKey,
                toPubkey: wSolAccount,
                lamports: Math.floor(wsolAmount * 10 ** 9),
            }),
            createSyncNativeInstruction(wSolAccount, TOKEN_PROGRAM_ID),
        );

        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        tx.feePayer = mainKp.publicKey
        const sig = await sendAndConfirmTransaction(connection, tx, [mainKp], { skipPreflight: false });
        console.log(`Wrapped SOL transaction: https://solscan.io/tx/${sig}`);
    } catch (error) {
        console.error("wrapSol error:", error);
    }
};

/**
 * Unwraps WSOL into SOL.
 * @param {Keypair} mainKp - The main keypair.
 */
const unwrapSol = async (mainKp: Keypair) => {
    const wSolAccount = await getAssociatedTokenAddress(NATIVE_MINT, mainKp.publicKey);
    try {
        const wsolAccountInfo = await connection.getAccountInfo(wSolAccount);
        if (wsolAccountInfo) {
            const tx = new Transaction().add(
                ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 261197 }),
                ComputeBudgetProgram.setComputeUnitLimit({ units: 101337 }),
                createCloseAccountInstruction(
                    wSolAccount,
                    mainKp.publicKey,
                    mainKp.publicKey,
                ),
            );
            tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
            tx.feePayer = mainKp.publicKey
            const sig = await sendAndConfirmTransaction(connection, tx, [mainKp], { skipPreflight: true });
            console.log(`Unwrapped SOL transaction: https://solscan.io/tx/${sig}`);
        }
    } catch (error) {
        console.error("unwrapSol error:", error);
    }
};