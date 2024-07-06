import "dotenv/config";
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo, transfer} from "@solana/spl-token";

const environment = 'devnet';
const TOKEN_MINT_ADDRESS = "FBAh3sQeaY5QYFnxjnfSHjYXdYzAJP2PMHbT3t2QbWzc";
const RECIPIENT_ADDRESS = "EWXc4JHes6ZLvtXt5yvAGwCtKLZif5EWGWrwm9gniQJG";
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

const senderTokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, user.publicKey);
console.log(`Sending 1 token to ${recipientAccount.toBase58()}`);

const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, recipientAccount);
const transferTxSig = await transfer(
    connection, 
    user, 
    senderTokenAccount.address, 
    recipientTokenAccount.address, 
    user,
    1 * MINOR_UNITS_PER_MAJOR_UNITS
);
const link = getExplorerLink("transaction", transferTxSig, environment);
console.log(`Transfer transaction: ${link}`);