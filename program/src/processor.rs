use crate::{
    error::MarketplaceError,
    instruction::CreateProjectInstruction,
    state::{ProjectData},
};
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    program_pack::IsInitialized,
    pubkey::Pubkey,
};

/// Instruction processor
pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    input: &[u8],
) -> ProgramResult {

    let tag = input.first().ok_or(MarketplaceError::InvalidInstruction)?;
    let account_info_iter = &mut accounts.iter();

    match tag {
        0 => {
            msg!("Hello there !");
            Ok(())
        }

        1 => {
            msg!("====> Create <====");
            let (_, rest) = input
                .split_first()
                .ok_or(MarketplaceError::InvalidInstruction)?;
            let instruction = CreateProjectInstruction::try_from_slice(rest)?;
            msg!("====> length ? {} <====", rest.len());
            msg!("====> instruction {} <====", instruction.name);
            
            let data_info = next_account_info(account_info_iter)?;

            msg!("====> instruction data length ={} <====", data_info.data.borrow().len());
            
            let mut project_data = ProjectData::try_from_slice(&data_info.data.borrow())?;
            if project_data.is_initialized() {
                msg!("Project already initialized");
                return Err(ProgramError::AccountAlreadyInitialized);
            }

            project_data.state = 0; //ProjectState::Initialized;
            project_data.name = instruction.name;

            project_data
                .serialize(&mut *data_info.data.borrow_mut())
                .map_err(|e| e.into())
        }

        _ => return Err(MarketplaceError::InvalidInstruction.into()),
    }
}
