const {join} = require('path');
const helloContract = join(__dirname, "../contracts/hello/");

describe.only('deploy works', () => {
  it('works', async () => {
    const tx = await wallet.contractMgr.deployContract(helloContract);
    console.log(tx);
  })
});