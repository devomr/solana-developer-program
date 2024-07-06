import "dotenv/config";
import {Connection, clusterApiUrl} from "@solana/web3.js";
import { getExplorerLink, getKeypairFromEnvironment} from "@solana-developers/helpers";
import {createMint} from "@solana/spl-token";

const environment = 'devnet';

// Init connection
const connection = new Connection(clusterApiUrl(environment), "confirmed");
console.log(`Connected to ${environment}`);

// Get user keypair
const user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`User address: ${user.publicKey.toBase58()}`);

// Create token mint
const mintAccount = await createMint(connection, user, user.publicKey, null, 9);
const link = getExplorerLink("address", mintAccount.toString(), environment);
console.log(`Mint created: ${link}`);
