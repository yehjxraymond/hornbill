const { join } = require("path");
const helloContract = join(__dirname, "../contracts/hello/");

describe("hello", () => {
  let code;
  beforeAll(async () => {
    code = await wallet.contractMgr.deployContract(helloContract);
  });

  describe("hi", () => {
    it("outputs hello to console", async () => {
      const result = await api.transact(
        {
          actions: [
            {
              account: code,
              name: "hi",
              authorization: [
                {
                  actor: accounts[1],
                  permission: "active"
                }
              ],
              data: {
                user: accounts[1]
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        }
      );
      expect(result.processed.action_traces[0].console).toEqual(
        `Hello ${accounts[1]} from hello`
      );
    });
  });
});
