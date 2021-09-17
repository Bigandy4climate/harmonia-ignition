use thiserror::Error;

use solana_program::program_error::ProgramError;

#[derive(Error, Debug, Copy, Clone)]
pub enum MarketplaceError {
    /// Invalid instruction
    #[error("Invalid Instruction")]
    InvalidInstruction,
}

impl From<MarketplaceError> for ProgramError {
    fn from(e: MarketplaceError) -> Self {
        ProgramError::Custom(e as u32)
    }
}
