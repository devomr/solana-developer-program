use anchor_lang::prelude::*;

declare_id!("DjEsmZ5LfTFk3r1ktbdZXruGqdjc7zRcU3A33xmvwwUX");

#[program]
pub mod testprogram {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
