const NodeosManager = require('./nodeos');

describe('nodeos', () => {
  describe('start', () => {
    it('starts nodeos and start producing blocks in a local setting', async () => {
      const nodeos = await NodeosManager.start();
      
      // nodeos pipes output to stderr, this function checks if there is any produced blocks
      const testNodeos = () => new Promise((resolve, reject) => {
        nodeos.stderr.on('data', (data) => {
          const output = data.toString();
          if(output.includes('Produced block')){
            nodeos.kill('SIGKILL');
            NodeosManager.proc = undefined;
            resolve(data);
          }
        });
      });

      await testNodeos();
    });
  });

  describe('stop' ,() => {
    it('stops a running nodeos', async () => {
      const nodeos = await NodeosManager.start();
      await NodeosManager.stop();
      expect(nodeos).toBe.undefined;
    });
  });
});