import {
    Connection, Keypair, sendAndConfirmTransaction, Transaction, TransactionInstruction
} from '@solana/web3.js';
import log from 'loglevel';
import { MarketplaceInstruction } from '../data/model';
import { programId } from '../testmarketplace';
import { checkProgram } from './utils';


export async function sayHello(connection: Connection, initiator: Keypair) {

    log.info("Let's say hello...");

    // Check program exist
    const accountPubkey = await checkProgram(connection, initiator, programId, "seed2ouf");

    // SSend Hello instruction
    const instruction = new TransactionInstruction({
        keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
        programId,
        data: Buffer.from(Uint8Array.of(MarketplaceInstruction.Hello)),
    });

    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [initiator],
    );

}


