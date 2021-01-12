require("dotenv").config();
const http = require("http");
const snoowrap = require("snoowrap");
const Discord = require("discord.js");

let BPSLastUpdated = null;
let HWSLastUpdated = null;
const timer = 300000;
const port = process.env.PORT || 3000;
const client = new Discord.Client();
const server = http.createServer((req, res) => {});

server.listen(port, () => {
    console.log(`Script running on port ${port}`);
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    setInterval(() => checkBPC(), timer);
    setInterval(() => checkHWS(), timer);
});

client.on("message", (msg) => {
    if (msg.content === "ping") {
        msg.reply("pong");
    }
});

client.login(process.env.TOKEN);

const requester = new snoowrap({
    userAgent: process.env.USERAGENT,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
});

const fetchNewPosts = (subreddit) => {
    return requester
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
    ];
    const HWSKeywords = ["us-wa"];
    let keywordsToUse = null;
    let lastUpdated = null;

    if (subreddit === "bps") {
        keywordsToUse = BPSKeywords;
        lastUpdated = BPSLastUpdated;
    } else {
        keywordsToUse = HWSKeywords;
        lastUpdated = HWSLastUpdated;
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

const sendMessages = (posts, subreddit) => {
    let channel = null;

    if (subreddit === "bps") {
        channel = client.channels.cache.get("794367501663600672");
        posts.forEach((post) =>
            channel.send(
                post.title +
                    "\n\nProduct Link: " +
                    post.url +
                    "\n\nSee Comments: https://www.reddit.com/" +
                    post.permalink
            )
        );
    } else {
        channel = client.channels.cache.get("795863235215360001");
        posts.forEach((post) =>
            channel.send(
                post.title +
                    "\n\nSee Comments: https://www.reddit.com/" +
                    post.permalink
            )
        );
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
            HWSLastUpdated = parsed[0].created;
        }
    } catch (error) {
        console.log(posts);
        console.error(error);
    }
};

const checkBPC = async () => {
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
            BPSLastUpdated = parsed[0].created;
        }
    } catch (error) {
        console.log(posts);
        console.error(error);
    }
};
