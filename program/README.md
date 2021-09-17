
### Build and test for program compiled natively
```
$ cargo build
$ cargo test
```

### Build and test the program compiled for BPF
```
$ cargo build-bpf
$ cargo test-bpf
```

### Check and set default config to target good network

local:
```shell
solana config set --url http://localhost:8899
solana config set --keypair ~/.config/solana/localhost.json
```

### Build and deploy the program locally
```
$ cargo build-bpf
$ solana deploy target/deploy/exchange.so
```

### Update the program locally
```
$ cargo build-bpf
$ solana program deploy --program-id target/deploy/exchange-keypair.json target/deploy/exchange.so
```

