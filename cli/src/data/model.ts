import * as borsh from 'borsh';
import { PublicKey } from '@solana/web3.js';

// pub enum MarketplaceInstruction {
//     Hello,
//     CreateProject { name: String },
// }

export enum MarketplaceInstruction {
    Hello, CreateProject
}

// Hook to serialize borsh to rust enum
// https://github.com/near/borsh-js/issues/21
export class CreateProject {
    name: string;
    constructor(fields: { name: string } | undefined = undefined) {
        if (fields) {
            this.name = fields.name;
        }
    }
}

export const CreateProjectSchema = new Map([[CreateProject, { kind: 'struct', fields: [['name', 'string']] }]]);
export const CreateProjectSize = borsh.serialize(CreateProjectSchema, new CreateProject({ name: "projectname" })).length;

export class ProjectData {
    state: number;
    name: string
    constructor(fields: {
        state: number,
        name: string
    } | undefined = undefined) {
        if (fields) {
            this.state = fields.state;
            this.name = fields.name;
        }
    }
}
export const ProjectDataSchema = new Map([
    [ProjectData, { kind: 'struct', fields: [['state', 'u8'], ['name', 'string']] }],
]);
export const ProjectDataSize = borsh.serialize(ProjectDataSchema, new ProjectData({ state: 0, name: "maxprojectname" }),).length;
