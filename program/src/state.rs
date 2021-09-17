use solana_program::program_pack::IsInitialized;

use borsh::{BorshDeserialize, BorshSchema, BorshSerialize};

/// Struct wrapping data and providing metadata
#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq)]
pub struct ProjectData {
    pub state: u8,
    pub supply: u32,
}

impl ProjectData {
    pub fn new(supply: u32) -> ProjectData {
        ProjectData {
            state: 1,
            supply,
        }
    }
}

impl IsInitialized for ProjectData {
    fn is_initialized(&self) -> bool {
        self.state == 1
    }
}

// #[derive(Clone, Debug, BorshSerialize, BorshDeserialize, BorshSchema, PartialEq)]
// pub enum ProjectState {
//     Initialized, Open, Closed
// }

// #[cfg(test)]
// pub mod tests {
//     use std::convert::TryInto;

//     use super::*;

//     #[test]
//     fn serialize_data() {
//         let state: u8 = 1;
//         let name = "theproject";
//         let name_length: u32 = name.len().try_into().unwrap();
//         let record: ProjectData = ProjectData {
//             state: state,
//             name: "theproject".into(),
//         };

//         let mut expected = vec![state];
//         expected.extend(name_length.to_le_bytes());
//         expected.extend_from_slice(&name.as_bytes());

//         assert_eq!(record.try_to_vec().unwrap(), expected);
//         assert_eq!(ProjectData::try_from_slice(&expected).unwrap(), record);
//     }
// }
