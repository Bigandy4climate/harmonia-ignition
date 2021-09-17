import {
    Connection, Keypair, sendAndConfirmTransaction, Transaction, TransactionInstruction
} from '@solana/web3.js';
import * as borsh from 'borsh';
import log from 'loglevel';
import { CreateProject, CreateProjectSchema, MarketplaceInstruction, ProjectData, ProjectDataSchema, ProjectDataSize } from '../data/model';
import { programId } from '../testmarketplace';
import { checkAccountExist, checkProgram } from './utils';


export async function createProject(connection: Connection, initiator: Keypair) {

    const totalSupply = Math.round(Math.random() * 1000);
    log.info(`Let's create a project with ${totalSupply} supply`);

    // Create account if it does not exist
    const seed = "seed2ouf";
    const accountPubkey = await checkProgram(connection, initiator, programId, seed);

    await checkAccountExist(connection, initiator, programId, seed, ProjectDataSize);

    const instruction = new TransactionInstruction({
        keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.from(Uint8Array.of(MarketplaceInstruction.CreateProject, ...borsh.serialize(CreateProjectSchema, new CreateProject({ supply: totalSupply })))),
    });

    log.info('Initializing project');
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [initiator],
    );

    // Load account
    log.info('Reading account data of ', programId.toBase58());
    const accountInfo = await connection.getAccountInfo(accountPubkey);
    const project = borsh.deserialize(ProjectDataSchema, ProjectData, accountInfo.data,);
    log.info(`Project supply is ${project.supply}`);
}


