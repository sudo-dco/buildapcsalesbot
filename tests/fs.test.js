require("regenerator-runtime/runtime");
const fs = require("../src/helpers/fs");

test("write to bps error log with status code 0", async () => {
    const status = await fs.setErrorLog("test", "bps");
    expect(status).toBe(0);
});

test("write to hws error log with status code 0", async () => {
    const status = await fs.setErrorLog("test", "hws");
    expect(status).toBe(0);
});

test("write to and read from bps timestamp log", async () => {
    const status = await fs.setTimestamp("test", "bps");
    if (status === 0) {
        const data = await fs.getTimestamp("bps");
        expect(data).toBe("test");
    }
});

test("write to and read from hws timestamp log", async () => {
    const status = await fs.setTimestamp("test", "hws");
    if (status === 0) {
        const data = await fs.getTimestamp("hws");
        expect(data).toBe("test");
    }
});
