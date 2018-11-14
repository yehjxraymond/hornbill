const fs = require("fs");
const crypto = require("crypto");
const { execAsync } = require("hornbill-utils");
const AccountManager = require("./accountManager");
const ContractManager = require("./contractManager");

const EOSIO_PRIVATE_KEY = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";

class Wallet {
  constructor({name, password}){
    this.name = name;
    this.password = password;
    this.privateKeys = [];
    this.publicKeys = [];
    this.accountMgr = new AccountManager(this);
    this.contractMgr = new ContractManager(this);
  }

  async unlock(){
    const res = await execAsync(`cleos wallet list | grep ${this.name}`);
    if(!res.includes('*')){
      await execAsync(`cleos wallet unlock -n ${this.name} --password ${this.password}`);
    }
  }

  async lock(){
    await execAsync(`cleos wallet lock -n ${this.name}`);
  }

  async lockAll(){
    await execAsync(`cleos wallet lock_all`);
  }

  async isLocked(){
    const res = await execAsync(`cleos wallet list | grep ${this.name}`);
    return !res.includes('*');
  }

  async hasPublicKey(publicKey){
    if(this.publicKeys.includes(publicKey)) return true;
    await this.unlock();
    try{
      const res = await execAsync(`cleos wallet keys | grep ${publicKey}`);
      return res.includes(publicKey);
    }catch(e){
      return false;
    }
  }

  async import(privateKey) {
    await this.unlock();
    const publicKey = await execAsync(`cleos wallet import -n ${this.name} --private-key ${privateKey} | sed -e "s/^imported private key for: //"`);
    this.publicKeys.push(publicKey.trim());
    this.privateKeys.push(privateKey);
  }
}

// Factory to create a new wallet
const create = async () => {
  const suffix = crypto.randomBytes(10).toString('hex');
  const name = `wallet-${suffix}`;
  await execAsync(`cleos wallet create -n ${name} --file /tmp/${name}`);
  const password = fs.readFileSync(`/tmp/${name}`).toString();
  return new Wallet({
    name,
    password
  });
}

// Bootstrap a new wallet for testing
const bootstrap = async (privateKey = EOSIO_PRIVATE_KEY) => {
  const wallet = await create();
  await wallet.import(privateKey);
  for(let i = 0; i<10; i++){
    await wallet.accountMgr.createAccount();
  }
  return wallet;q
}

module.exports = {
  create,
  bootstrap
}
