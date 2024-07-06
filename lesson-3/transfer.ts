import "dotenv/config";
import {Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction} from "@solana/web3.js";
import { getKeypairFromEnvironment} from "@solana-developers/helpers";
import { createMemoInstruction } from "@solana/spl-memo";

const environment = 'devnet';

// Init connection
const connection = new Connection(clusterApiUrl(environment), "confirmed");
console.log(`Connected to ${environment}`);

// Get sender keypair
const sender = getKeypairFromEnvironment("SECRET_KEY");
console.log(`Sender address: ${sender.publicKey.toBase58()}`);

// Init receiver public key and get balance
const receiver = new PublicKey("EWXc4JHes6ZLvtXt5yvAGwCtKLZif5EWGWrwm9gniQJG");
const receiverBalance = await connection.getBalance(receiver);
console.log(`Receiver balance: ${receiverBalance / LAMPORTS_PER_SOL}`);

// Perform transaction
const transaction = new Transaction();
const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: 0.1 * LAMPORTS_PER_SOL,
});
transaction.add(transferInstruction);

const memoInstruction = createMemoInstruction(
    "Multumesc pentru cafea"
);
transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
console.log(`Transaction confirmed. Signature: ${signature}`);

// Get receiver new balance
const receiverNewBalance = await connection.getBalance(receiver);
console.log(`Receiver new balance: ${receiverNewBalance / LAMPORTS_PER_SOL}`);