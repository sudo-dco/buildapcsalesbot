const express = require("express");
const clients = require("../src/helpers/clients");
const ts = require("../src/helpers/timestamps");

// VARS
let lastUpdated = null;
let bpcInterval = null;
let hwsInterval = null;
const timer = 300000;
const bpsChannelID = "794367501663600672";
const hwsChannelID = "795863235215360001";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

app.get("/startInterval", (req, res) => {
    try {
        updateTimestamp();
        bpcInterval = setInterval(() => checkBPC(), timer);
        hwsInterval = setInterval(() => checkHWS(), timer);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.get("/stopInterval", (req, res) => {
    try {
        clearInterval(bpcInterval);
        clearInterval(hwsInterval);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.get("/runBPS", (req, res) => {
    try {
        updateTimestamp();
        checkBPS();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.get("/runHWS", (req, res) => {
    try {
        updateTimestamp();
        checkHWS();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
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

const fetchNewPosts = (subreddit) => {
    return clients.snoowrap
        .getSubreddit(subreddit)
        .getNew()
        .map((post) => ({
            title: post.title,
            id: post.id,
            url: post.url,
            created: post.created,
            permalink: post.permalink,
        }));
};

// parse keywords in posts
const parsePosts = (posts, subreddit) => {
    const BPSKeywords = [
        "case",
        "ram",
        "mobo",
        "motherboard",
        "psu",
        "ssd",
        "cooler",
        "fan",
        "monitor",
        "combo",
        "gpu",
        "restock",
    ];
    const HWSKeywords = ["us-wa"];
    let keywordsToUse = null;

    switch (subreddit) {
        case "bps":
            keywordsToUse = BPSKeywords;
            break;
        case "hws":
            keywordsToUse = HWSKeywords;
            break;
        default:
            console.error("parsePosts: failed to match subreddit");
            break;
    }

    return posts.filter((post) => {
        const title = post.title;
        const splitTitle = title.split(" ");
        const tag = splitTitle[0]
            .substring(1, splitTitle[0].length - 1)
            .toLowerCase();

        if (
            (keywordsToUse.includes(tag) && post.created > lastUpdated) ||
            (keywordsToUse.includes(tag) && lastUpdated === null)
        ) {
            return {
                title: post.title,
                url: post.url,
                permalink: post.permalink,
            };
        }
    });
};

const deleteMessages = (channel) => {
    let channelObj = null;

    switch (channel) {
        case "bps":
            channelObj = clients.discord.channels.cache.get(bpsChannelID);
            channelObj.bulkDelete(100);
            console.log("BPS Channel Cleared");
            break;
        case "hws":
            channelObj = clients.discord.channels.cache.get(hwsChannelID);
            channelObj.bulkDelete(100);
            console.log("HWS Channel Cleared");
            break;
    }
};

const sendMessages = (posts, subreddit) => {
    let channel = null;

    switch (subreddit) {
        case "bps":
            channel = clients.discord.channels.cache.get(bpsChannelID);
            posts.forEach((post) =>
                channel.send(
                    post.title +
                        "\n\nProduct Link: " +
                        post.url +
                        "\n\nSee Comments: https://www.reddit.com/" +
                        post.permalink
                )
            );
            break;
        case "hws":
            channel = clients.discord.channels.cache.get(hwsChannelID);
            posts.forEach((post) =>
                channel.send(
                    post.title +
                        "\n\nSee Comments: https://www.reddit.com/" +
                        post.permalink
                )
            );
            break;
    }
};

const updateTimestamp = async () => {
    const time = await ts.getTimestamp();

    if (time !== "null") {
        lastUpdated = parseInt(time);
    }
};

const checkHWS = async () => {
    let posts = null;

    try {
        posts = await fetchNewPosts("hardwareswap");
        console.log(
            `Fetching new posts at ${new Date().toLocaleTimeString("en-US")}`
        );

        const parsed = await parsePosts(posts, "hws");
        if (parsed.length === 0) {
            console.log("[HWS] No new posts found within last five minutes");
        } else {
            console.log(
                `[HWS] ${parsed.length} posts found! Sending to Discord...`
            );
            sendMessages(parsed, "hws");
            lastUpdated = parsed[0].created;
            // update timestamp file
            ts.setTimestamp(parsed[0].created.toString());
        }
    } catch (error) {
        console.error("Error with checkHWS: ", error);
    }
};

const checkBPS = async () => {
    let posts = null;

    try {
        posts = await fetchNewPosts("buildapcsales");
        console.log(
            `Fetching new posts at ${new Date().toLocaleTimeString("en-US")}`
        );

        const parsed = await parsePosts(posts, "bps");
        if (parsed.length === 0) {
            console.log("[BPS] No new posts found within last five minutes");
        } else {
            console.log(
                `[BPS] ${parsed.length} posts found! Sending to Discord...`
            );
            sendMessages(parsed, "bps");
            lastUpdated = parsed[0].created;
            // update timestamp file
            ts.setTimestamp(parsed[0].created.toString());
        }
    } catch (error) {
        console.error("Error with checkBPC: ", error);
    }
};
