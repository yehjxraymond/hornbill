const { execAsync } = require("hornbill-utils");

class ContractManager {
  constructor(wallet) {
    this.wallet = wallet;
  }

  async deployContract(
    contractDir,
    account
  ) {
    await this.wallet.unlock();
    const deployAccount = account || this.wallet.accountMgr.accounts[0] || "eosio";
    await execAsync(`cleos set contract ${deployAccount} ${contractDir}`);
    return deployAccount;
  }
}

module.exports = ContractManager;