const anchor = require('@project-serum/anchor');

describe('harmonia-ignition-2.1', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.HarmoniaIgnition2.1;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});
