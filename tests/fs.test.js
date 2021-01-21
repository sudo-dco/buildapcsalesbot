require("regenerator-runtime/runtime");
const fs = require("../src/helpers/fs");

xtest("write times to timestamp file correctly", async () => {
    const fn = await checkLU.setTimestamp("1234567890");
    expect(fn).toBe(0);
});

xtest("read times from timestamp file correctly", async () => {
    const fn = await checkLU.getTimestamp();
    expect(fn).toBe("1234567890");
});

test("write to bps error log with status code 0", async () => {
    const status = await fs.setErrorLog("test", "bps");
    expect(status).toBe(0);
});

test("write to hws error log with status code 0", async () => {
    const status = await fs.setErrorLog("test", "hws");
    expect(status).toBe(0);
});
