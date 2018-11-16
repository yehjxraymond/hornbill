const { join } = require('path');
const { execAsync } = require("hornbill-utils");

class ContractManager {
  constructor(wallet) {
    this.wallet = wallet;
  }

  async compileContract(dir, name) {
    await execAsync(`cd ${dir} && eosio-cpp -abigen ${name}.cpp -o ${name}.wasm`);
  }

  async deployContract(
    contractDir,
    contractName,
    account
  ) {
    await this.compileContract(contractDir, contractName);
    await this.wallet.unlock();
    const deployAccount = account || this.wallet.accountMgr.accounts[0] || "eosio";
    await execAsync(`cleos set contract ${deployAccount} ${contractDir}`);
    return deployAccount;
  }
}

module.exports = ContractManager;