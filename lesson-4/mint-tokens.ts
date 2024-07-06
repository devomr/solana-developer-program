import "dotenv/config";
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo} from "@solana/spl-token";

const environment = 'devnet';
const TOKEN_MINT_ADDRESS = "FBAh3sQeaY5QYFnxjnfSHjYXdYzAJP2PMHbT3t2QbWzc";
const RECIPIENT_ADDRESS = "ArX7qjR1w4bL8AjKJDRscngdbb4E2nHEPVUFx8TKAGcE";
const TOKEN_DECIMALS = 9;
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, TOKEN_DECIMALS);

// Init connection
const connection = new Connection(clusterApiUrl(environment), "confirmed");
console.log(`Connected to ${environment}`);

// Get user keypair
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`User address: ${user.publicKey.toBase58()}`);

// Define token mint account
const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);

// Define recepient public key
const recipientAccount = new PublicKey(RECIPIENT_ADDRESS);

// Get existing associate token account
const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, recipientAccount);
console.log(`Token account address: ${tokenAccount.address.toBase58()}`);

// Mint token
const mintTxSig = await mintTo(
    connection, 
    user, 
    tokenMintAccount, 
    tokenAccount.address, 
    user, 
    5 * MINOR_UNITS_PER_MAJOR_UNITS
);
const link = getExplorerLink("transaction", mintTxSig, environment);
console.log(`Mint token transaction: ${link}`);
