import loginToChesskid from "../LoginToChesskid";

describe("Login to Chesskid", () => {
  it("should login to Chesskid and return a cookie string", async () => {
    const [user, pass] = [
      process.env.CHESSKID_USERNAME,
      process.env.CHESSKID_PASSWORD,
    ];
    const result = await loginToChesskid(user, pass);
    console.log(result);
    expect(result).toBeDefined();
  }, 10000); // set the timeout on a single test

  it("should fail to login to Chesskid and return an error", async () => {
    const [user, pass] = ["", ""];
    try {
      await loginToChesskid(user, pass);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
