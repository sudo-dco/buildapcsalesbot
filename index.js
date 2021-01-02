require("dotenv").config();
const snoowrap = require("snoowrap");
const Discord = require("discord.js");

let lastUpdated = null;
const keywords = [
    "[CASE]",
    "[RAM]",
    "[MOBO]",
    "[PSU]",
    "[SSD - M2]",
    "[COOLER]",
    "[FAN]",
    "[MONITOR]",
    "[COMBO]",
];
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log("Running script");
    setInterval(() => init(), 120000);
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

const fetchNewPosts = () => {
    return requester
        .getSubreddit("buildapcsales")
        .getNew()
        .map((post) => {
            // only push post through if it's newer than lastUpdated or lastUpdated hasn't been set yet
            if (post.created > lastUpdated || lastUpdated === null) {
                return {
                    title: post.title,
                    id: post.id,
                    url: post.url,
                    created: post.created,
                };
            }
        });
};

const parseKeywords = (posts) => {
    return posts.filter((post) => {
        const title = post.title;
        const tag = title.split(" ");

        if (keywords.includes(tag[0])) {
            return {
                title: post.title,
                url: post.url,
            };
        }
    });
};

const sendMessages = (posts) => {
    const channel = client.channels.cache.get("794367501663600672");
    posts.forEach((post) => channel.send(`${post.title}, ${post.url}`));
};

const init = async () => {
    try {
        const posts = await fetchNewPosts();
        console.log(
            `Fetching new posts at ${new Date().toLocaleTimeString("en-US")}`
        );

        if (posts.length === 0) {
            console.log("No new posts found...");
        } else {
            const parsed = await parseKeywords(posts);
            console.log(`${parsed.length} posts found! Sending to Discord...`);

            sendMessages(parsed);
        }

        lastUpdated = Date.now();
    } catch (error) {
        console.error(error);
    }
};
