import { Metaplex } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { Token, holderInfo } from "./types";
import { LIQUIDITY_STATE_LAYOUT_V4 } from "@raydium-io/raydium-sdk";
import { SOLANA_RPC } from "../helpers/constants";

export const commitmentLevel = "processed";
export const endpoint = process.env.SOLANA_RPC || clusterApiUrl("devnet");
export const connection = new Connection(endpoint, commitmentLevel);

const metaplex = Metaplex.make(connection);

export const socialCheckFunc = async (mint: PublicKey) => {
    try {
     
        return socials;
    } catch (error) {
        throw new Error("error");

    }
}

export const lockCheckFunc = async (mint: PublicKey, poolAddress: PublicKey) => {
    try {
       
            return burnPct;
        } else {
            console.error(`Expected parsed account data, but received raw buffer data for mint: ${mint}`);
        }
    } catch (error) {
        console.error("Error fetching liquidity info:", error);
    }

}

// ================== Get Holders ===========================
export const findHolders = async (mint: PublicKey) => {
    // Pagination logic
    
  
    return allOwners;
  };


export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}