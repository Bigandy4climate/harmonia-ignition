import {
    Connection, Keypair, sendAndConfirmTransaction, Transaction, TransactionInstruction
} from '@solana/web3.js';
import * as borsh from 'borsh';
import log from 'loglevel';
import { CreateProject, CreateProjectSchema, MarketplaceInstruction, ProjectDataSize } from '../data/model';
import { programId } from '../testmarketplace';
import { checkAccountExist, checkProgram } from './utils';


export async function createProject(connection: Connection, initiator: Keypair) {

    const projectName = "project" + Math.round(Math.random() * 100);
    log.info(`Let's create a project ${projectName}`);

    // Create account if it does not exist
    const seed = "seed2ouf";
    const accountPubkey = await checkProgram(connection, initiator, programId, seed);

    await checkAccountExist(connection, initiator, programId, seed, ProjectDataSize);

    const instruction = new TransactionInstruction({
        keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.from(Uint8Array.of(MarketplaceInstruction.CreateProject, ...borsh.serialize(CreateProjectSchema, new CreateProject({ name: projectName })))),
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [initiator],
    );

    // Find out how many times that account has been greeted
    // log.info('Reading hello to ', programId.toBase58());
    // const accountInfo = await connection.getAccountInfo(accountPubkey);
    // const greeting = borsh.deserialize(GreetingSchema, GreetingAccount, accountInfo.data,);
    // log.info(`Greeted ${greeting.counter} times`);
}


