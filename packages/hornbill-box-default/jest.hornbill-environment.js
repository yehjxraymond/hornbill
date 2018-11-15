const NodeEnvironment = require('jest-environment-node');
const hornbillNodeos = require('hornbill-nodeos');
const hornbillWallet = require('hornbill-wallet');

class HornbillEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    const proc = await hornbillNodeos.start();
    const wallet = await hornbillWallet.bootstrapWallet();
    this.global.wallet = wallet;
    this.global.accounts = wallet.accountMgr.accounts;
  }

  async teardown() {
    await hornbillNodeos.stop();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = HornbillEnvironment;