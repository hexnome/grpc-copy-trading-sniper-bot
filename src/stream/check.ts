import { Connection } from "@solana/web3.js";
import { endpoint, tokenDelayTime } from "../helpers/constants";
import { commitmentLevel } from "../utils/utils";
import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { Token } from "../utils/types";
import { LIQUIDITY_STATE_LAYOUT_V4 } from "@raydium-io/raydium-sdk";

const connection = new Connection(endpoint, commitmentLevel);
const metaplex = Metaplex.make(connection);

export class Check {
    constructor() {

    }
    public socialCheck = async (mint: PublicKey) => {
        try {
            
            return socials;
        } catch (error) {
            throw new Error("error");
        }
    }
    public LPCheck = async (lpMint: PublicKey, poolAddress: PublicKey) => {
        try {
            
                return burnPct;
            } else {
                console.error(`Expected parsed account data, but received raw buffer data for mint: ${lpMint}`);
                throw new Error("Expected parsed account data")
            }

        } catch (error) {

        }
    }


}

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}