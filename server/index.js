const express = require("express");
const fs = require("../src/helpers/fs");
const hws = require("../src/hws/hws");
const bps = require("../src/bps/bps");
const hls = require("../src/hls/hls");

// VARS
const TIMER = 300000; // default 5 mins
let bpsLastUpdated = null;
let hwsLastUpdated = null;
let bpsInterval = null;
let hwsInterval = null;
let hlsInterval = null;

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

app.get("/startBPSInterval", async (req, res) => {
    try {
        await updateTimestamp();

        bpsInterval = setInterval(async () => {
            let bpsStatus = await bps.getPosts(bpsLastUpdated);
            // error code 1 - failed to fetch new posts, keep old timestamp
            if (bpsStatus !== 1) {
                bpsLastUpdated = bpsStatus;
                await fs.setTimestamp(bpsStatus.toString(), "bps");
            }
        }, TIMER);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error running BPS interval");
        fs.setErrorLog(error.toString(), "bps");
        res.sendStatus(500);
    }
});

app.get("/startHWSInterval", async (req, res) => {
    try {
        await updateTimestamp();

        hwsInterval = setInterval(async () => {
            let hwsStatus = await hws.getPosts(hwsLastUpdated);
            // error code 1 - failed to fetch new posts, keep old timestamp
            if (hwsStatus !== 1) {
                hwsLastUpdated = hwsStatus;
                await fs.setTimestamp(hwsStatus.toString(), "hws");
            }
        }, TIMER);

        res.sendStatus(200);
    } catch (error) {
        console.error("Error running HWS interval");
        fs.setErrorLog(error.toString(), "hws");
        res.sendStatus(500);
    }
});

app.get("/startHLSInterval", async (req, res) => {
    hlsInterval = setInterval(() => {
        hls.getPosts();
    }, TIMER);

    res.sendStatus(200);
});

app.get("/stopInterval", (req, res) => {
    try {
        clearInterval(bpsInterval);
        clearInterval(hwsInterval);
        console.log("Stop Interval Running");
        res.sendStatus(200);
    } catch (error) {
        console.error("Error running stop interval");
        res.sendStatus(500);
    }
});

app.get("/runBPS", async (req, res) => {
    try {
        await updateTimestamp();

        let bpsStatus = await bps.getPosts(bpsLastUpdated);
        // error code 1 - failed to fetch new posts, keep old timestamp
        if (bpsStatus !== 1) {
            bpsLastUpdated = bpsStatus;
            await fs.setTimestamp(bpsStatus.toString(), "bps");
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Error running BPS");
        fs.setErrorLog(error.toString(), "bps");
        res.sendStatus(500);
    }
});

app.get("/runHWS", async (req, res) => {
    try {
        await updateTimestamp();

        let hwsStatus = await hws.getPosts(hwsLastUpdated);
        // error code 1 - failed to fetch new posts, keep old timestamp
        if (hwsStatus !== 1) {
            hwsLastUpdated = hwsStatus;
            await fs.setTimestamp(hwsStatus.toString(), "hws");
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Error running HWS interval");
        fs.setErrorLog(error.toString(), "hws");
        res.sendStatus(500);
    }
});

app.get("/runHLS", async (req, res) => {
    hls.getPosts();
});

app.get("/clearBPSChannel", (req, res) => {
    try {
        deleteMessages("bps");
        res.sendStatus(200);
    } catch (error) {
        console.error("Error clearing BPC Channel: ", error);
        res.sendStatus(500);
    }
});

app.get("/clearHWSChannel", (req, res) => {
    try {
        deleteMessages("hws");
        res.sendStatus(200);
    } catch (error) {
        console.error("Error clearing HWS Channel: ", error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Script running on port ${port}`);
});

const updateTimestamp = async () => {
    const bpsTime = await fs.getTimestamp("bps");
    const hwsTime = await fs.getTimestamp("hws");

    if (bpsTime !== null) {
        bpsLastUpdated = parseInt(bpsTime);
    }

    if (hwsTime !== null) {
        hwsLastUpdated = parseInt(hwsTime);
    }
};
