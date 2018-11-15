# Hornbill EOS test suite

Think of hornbill as [truffle](https://truffleframework.com/truffle) but for EOS. 

## Hornbill components

### hornbil-wallet

Hornbill wallet allows developer to bootstrap a set of 10 test accounts for development work. The wallet also allow developers to deploy EOS smart contracts from a contract directory. It assumes that system contracts (such as eosio.token) are not available and there are no need to stake EOS/SYS for account creation & deployment of contracts. Additionally the smart contracts have to be precompiled by eosio-cpp first. 

#### Pre-requisites
- nodeos
- keosd
- cleos
- eosio-cpp (from eosio-cdt)

### hornbill-nodeos

Hornbill nodeos allows developers to programatically start and stop the nodeos application with a default configuration. 

#### Pre-requisites
- nodeos

### hornbill-utils

Hornbil utils is a shared library used by other hornbill modules. 

## Development Pipeline
- setting up of test environment like how `truffle init` does it
  - using jest with global setup configuation

# Todo
- smart contract artifactor
  - abi to object
  - executable functions and default values
- deterministic wallet account name generation/wallet file migration

# Bug/Improvement
- setup and teardown for hornbill-box-default is ran per test file, need to change that for the entire contract OR add an await for proc.killed