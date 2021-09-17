#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';
import { program } from 'commander';
import log from 'loglevel';

import { Keypair, Connection, PublicKey } from '@solana/web3.js';
import { sayHello } from './commands/sayHello';
import { establishConnection, getInitiator } from './commands/utils';
import { createProject } from './commands/createProject';

program.version('0.0.1');
log.setLevel(log.levels.INFO);

export const programId = new PublicKey("EnRDAtDvhv5USJP55pbA53y9oSUtN4UGL7K8kZ6HjKkg");

programCommand('hello')
  .action(async (directory, cmd) => {

    const { keypair, env } = cmd.opts();

    // Establish connection to the cluster
    const connection = await establishConnection(env as string);
    const initiator = await getInitiator(keypair as string);
    await printBalance(connection, initiator);

    sayHello(connection, initiator);
});

programCommand('create')
  .action(async (directory, cmd) => {

    const { keypair, env } = cmd.opts();

    // Establish connection to the cluster
    const connection = await establishConnection(env as string);
    const initiator = await getInitiator(keypair as string);
    await printBalance(connection, initiator);

    createProject(connection, initiator);
});

function programCommand(name: string) {
  return program
    .command(name)
    .option(
      '-e, --env <string>',
      'Solana cluster env name',
      '', //mainnet-beta, testnet, devnet, localhost (default)
    )
    .option(
      '-k, --keypair <path>',
      `Solana wallet location`,
      '',
    )
    .option('-l, --log-level <string>', 'log level', setLogLevel);
}

async function printBalance(connection: Connection, wallet: Keypair) {
  let lamports = await connection.getBalance(wallet.publicKey);
  log.info(`Wallet ${wallet.publicKey}, Balance: ${lamports}`);
  return lamports;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setLogLevel(value, prev) {
  if (value === undefined || value === null) {
    return
  }
  log.info("setting the log value to: " + value);
  log.setLevel(value);
}

program.parse(process.argv);
