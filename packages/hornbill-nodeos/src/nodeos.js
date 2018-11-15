const { join } = require("path");
const { spawn } = require("child_process");

class NodeosManager {
  async start() {
    if (this.proc) {
      return this.proc;
    }
    const defaultConfigDir = join(__dirname, "../config/");
    this.proc = spawn("nodeos", [
      "--config-dir",
      defaultConfigDir,
      "--delete-all-blocks"
    ]);
    return this.proc;
  }

  async stop() {
    if (!this.proc) {
      return;
    }
    // Using sigkill to kill nodeos faster
    // (and also because we are starting a fresh chain)
    this.proc.kill("SIGKILL");
    this.proc = undefined;
  }
}

module.exports = new NodeosManager();
