import "dotenv/config";
import {Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl} from "@solana/web3.js";
import {airdropIfRequired, getKeypairFromEnvironment} from "@solana-developers/helpers";
import bs58 from "bs58";

const environment = 'devnet';
 
const connection = new Connection(clusterApiUrl(environment));
console.log(`Connected to ${environment}`);

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const encodedKey = bs58.encode(keypair.secretKey);

console.log(`Encoded key: ${encodedKey}`);

const publicKey = new PublicKey(keypair.publicKey);

const airdrop = await airdropIfRequired(connection, publicKey, 2*LAMPORTS_PER_SOL, 0.5*LAMPORTS_PER_SOL);
console.log(`Airdrop to ${keypair.publicKey}, amount ${airdrop} Lamports`);

const balanceInLamport = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;

console.log(`Balance for wallet ${publicKey} is ${balanceInLamport} Lamports`);
console.log(`Balance for wallet ${publicKey} is ${balanceInSol} SOL`);