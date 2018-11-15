const hornbillNodeos = require("hornbill-nodeos");

const setup = async () => {
  await hornbillNodeos.start();
};

module.exports = setup;
