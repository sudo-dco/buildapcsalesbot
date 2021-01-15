const checkLU = require("../src/helpers/timestamps");

test("write times to timestamp file correctly", async () => {
    const fn = await checkLU.setTimestamp("1234567890");
    expect(fn).toBe(0);
});

test("read times from timestamp file correctly", async () => {
    const fn = await checkLU.getTimestamp();
    expect(fn).toBe("1234567890");
});
