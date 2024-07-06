import "dotenv/config";
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount} from "@solana/spl-token";

const environment = 'devnet';
const tokenMintAddress = "FBAh3sQeaY5QYFnxjnfSHjYXdYzAJP2PMHbT3t2QbWzc";
const recipientAddress = "EWXc4JHes6ZLvtXt5yvAGwCtKLZif5EWGWrwm9gniQJG";

// Init connection
const connection = new Connection(clusterApiUrl(environment), "confirmed");
console.log(`Connected to ${environment}`);

// Get user keypair
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`User address: ${user.publicKey.toBase58()}`);

// Define token mint account
const tokenMintAccount = new PublicKey(tokenMintAddress);

// Define recepient public key
const recipientAccount = new PublicKey(recipientAddress);

// Create associate token account
const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, user, tokenMintAccount, recipientAccount);
const link = getExplorerLink("address", tokenAccount.address.toBase58(), environment);
console.log(`Token account created: ${link}`);