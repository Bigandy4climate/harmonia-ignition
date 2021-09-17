use borsh::{BorshDeserialize, BorshSerialize};

/// Instructions supported by the program
#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, PartialEq)]
pub enum MarketplaceInstruction {

    /// Say hello
    ///
    /// Accounts expected by this instruction:
    ///
    /// 0. `[signer]`
    Hello,

    /// Create a new record
    ///
    /// Accounts expected by this instruction:
    ///
    /// 0. `[writable]` Record account, must be uninitialized
    /// 1. `[]` Record authority
    CreateProject,
}


#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, PartialEq)]
pub struct CreateProjectInstruction {
    pub supply: u32
}
