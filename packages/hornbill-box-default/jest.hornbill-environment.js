const { Api, JsonRpc, RpcError, JsSignatureProvider } = require('eosjs');
const fetch = require('node-fetch');
const { TextDecoder, TextEncoder } = require('text-encoding');
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
    this.global.deploy = wallet.contractMgr.deployContract;

    const signatureProvider = new JsSignatureProvider(wallet.privateKeys);
    const rpc = new JsonRpc('http://localhost:8888', { fetch });
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    this.global.api = api;
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