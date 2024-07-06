Notes:

* Tokens on Solana chain are called SPL tokens
* Token Program = contains instructions to interact with SPL tokens
* Token Mint = account that contains information about a token (decimals, mint_authority, freeze_authority, supply)
* Token Account = account used to define the ownership of a Token Mint (one Token Account for each token). In the Token Account are stored info like mint, owner and amount of tokens owned
* Associated Token Account = account created for each keypari Token Mint - Wallet Pubkey
