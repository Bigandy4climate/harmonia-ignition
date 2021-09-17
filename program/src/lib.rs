use solana_program::{account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey};

pub mod error;
pub mod instruction;
pub mod processor;
pub mod state;

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    msg!("Entering marketplace smartcontract");

    crate::processor::process_instruction(program_id, accounts, instruction_data)
}
