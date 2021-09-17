use solana_program::program_pack::IsInitialized;

use {
    borsh::{BorshDeserialize, BorshSchema, BorshSerialize},
};

/// Struct wrapping data and providing metadata
#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq)]
pub struct ProjectData {
    /// Project state
    pub state: u8,
    /// The account allowed to update the data
    // pub authority: Pubkey,
    /// The data contained by the account, could be anything serializable
    pub name: String,
}

impl IsInitialized for ProjectData {
    /// Is initialized
    fn is_initialized(&self) -> bool {
        // self.state == ProjectState::Initialized
        self.state == 0
    }
}

// #[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq)]
// pub enum ProjectState {
//     Initialized, Open, Closed
// }
