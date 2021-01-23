require("regenerator-runtime/runtime");
const fs = require("../src/helpers/fs");

xtest("write to bps error log with status code 0", async () => {
    const status = await fs.setErrorLog("test", "bps");
    expect(status).toBe(0);
});

xtest("write to hws error log with status code 0", async () => {
    const status = await fs.setErrorLog("test", "hws");
    expect(status).toBe(0);
});

xtest("write to and read from bps timestamp log", async () => {
    const status = await fs.setTimestamp("test", "bps");
    if (status === 0) {
        const data = await fs.getTimestamp("bps");
        expect(data).toBe("test");
    }
});

xtest("write to and read from hws timestamp log", async () => {
    const status = await fs.setTimestamp("test", "hws");
    if (status === 0) {
        const data = await fs.getTimestamp("hws");
        expect(data).toBe("test");
    }
});

test("return null if no timestamp log found", async () => {
    // delete timestamp file first
    const data = await fs.getTimestamp("bps");
    expect(data).toBe(null);
});
