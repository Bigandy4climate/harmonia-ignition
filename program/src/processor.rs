use crate::{error::MarketplaceError, instruction::CreateProjectInstruction, state::ProjectData};
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

/// Instruction processor
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    input: &[u8],
) -> ProgramResult {
    // Read instrcution tag to dispatch to good method
    let tag = input.first().ok_or(MarketplaceError::InvalidInstruction)?;

    let account_info_iter = &mut accounts.iter();
    let account = next_account_info(account_info_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // Check that account data has been initialized
    // If state == 0 && tag != 1 (init) exit with error
    if account.data.borrow()[0] == 0 {
        match tag {
            1 => {
                msg!("Initializing account");
                let (_, rest) = input
                    .split_first()
                    .ok_or(MarketplaceError::InvalidInstruction)?;
                let instruction = CreateProjectInstruction::try_from_slice(rest)
                    .expect("Failed to read CreateProjectInstruction");
                let data = ProjectData::new(instruction.supply);
                data.serialize(&mut *account.data.borrow_mut())
                    .expect("Failed to serialize initiale ProjectData");
                return Ok(());
            }
            _ => {
                msg!("Account as not been initialized");
                return Err(MarketplaceError::AccountNotInitialized.into());
            }
        }
    }

    match tag {
        0 => {
            msg!("Hello there !");
            Ok(())
        }

        1 => {
            msg!("Project already initialized");
            Ok(())
        }

        _ => return Err(MarketplaceError::InvalidInstruction.into()),
    }
}
