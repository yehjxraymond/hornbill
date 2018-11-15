const hornbillNodeos = require("hornbill-nodeos");

const teardown = async () => {
  await hornbillNodeos.stop();
};

module.exports = teardown;
