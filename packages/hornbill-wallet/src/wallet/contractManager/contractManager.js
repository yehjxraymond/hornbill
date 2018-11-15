const { join } = require('path');
const { execAsync } = require("hornbill-utils");

class ContractManager {
  constructor(wallet) {
    this.wallet = wallet;
  }

  async compileContract(dir, name) {
    const cppFile = join(dir, name , `${name}.cpp`);
    const wasmFile = join(dir, name, `${name}.wasm`);
    await execAsync(`eosio-cpp -abigen ${cppFile} -o ${wasmFile}`);
  }

  async deployContract(
    contractDir,
    contractName,
    account
  ) {
    await this.compileContract(contractDir, contractName);
    await this.wallet.unlock();
    const deployAccount = account || this.wallet.accountMgr.accounts[0] || "eosio";
    await execAsync(`cleos set contract ${deployAccount} ${join(contractDir, contractName)}`);
    return deployAccount;
  }
}

module.exports = ContractManager;