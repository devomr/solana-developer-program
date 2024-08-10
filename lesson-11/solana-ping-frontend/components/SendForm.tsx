import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import styles from '../styles/PingButton.module.css';

export const SendForm = () => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [solBalance, setSolBalance] = useState('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();


    useEffect(() => {
        getBalance();
    }, [connection, publicKey]);


    const getBalance = async () => {
        if (!connection || !publicKey) {
            setSolBalance('Cannot be retrieved');
            return;
        }

        const userBalance = await connection.getBalance(publicKey);
        const formattedBalance = (userBalance / LAMPORTS_PER_SOL).toFixed(2);
        setSolBalance(`${formattedBalance} SOL`);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!connection || !publicKey) {
            alert('Please connect your wallet');
            return;
        }

        const transaction = new Transaction();
        const transferInstruction = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(address),
            lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        });
        transaction.add(transferInstruction);

        const signature = await sendTransaction(transaction, connection);
        console.log(`Send transaction confirmed. Signature: ${signature}`);
    };

    return (
        <div>
            <div>
                Balance: {solBalance}
            </div>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="amountInput">Amount (in SOL) to send:</label>
                    <input
                        type="number"
                        id="amountInput"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="addressInput">SOL address:</label>
                    <input
                        type="text"
                        id="addressInput"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>


                <button type="submit" className={styles.button}>Send</button>
            </form>
        </div>
    );
};
