// Define interfaces for the token metadata structure
export interface Socials {
    website?: string;
    telegram?: string;
    twitter?: string;
}

export interface TokenJson {
    createdOn?: string;
    website?: string;
    telegram?: string;
    twitter?: string;
    extensions?: Socials;
}

// Assuming you have a type for the Token response
export interface Token {
    json: TokenJson;
}


export interface holderInfo {
    name: string;
    owner: string;
    amount: number
  }