require("dotenv").config();
const snoowrap = require("snoowrap");
const Discord = require("discord.js");

let lastUpdated = null;
const keywords = [
    "[CASE]",
    "[RAM]",
    "[MOBO]",
    "[PSU]",
    "[SSD]",
    "[COOLER]",
    "[FAN]",
    "[MONITOR]",
    "[COMBO]",
];
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log("Running script");
    init();
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
        .map((post) => ({
            title: post.title,
            id: post.id,
            url: post.url,
            created: post.created,
            permalink: post.permalink,
        }));
};

const parsePosts = (posts) => {
    return posts.filter((post) => {
        const title = post.title;
        const tag = title.split(" ");

        if (
            (keywords.includes(tag[0]) && post.created > lastUpdated) ||
            (keywords.includes(tag[0]) && lastUpdated === null)
        ) {
            return {
                title: post.title,
                url: post.url,
                permalink: post.permalink,
            };
        }
    });
};

const sendMessages = (posts) => {
    const template = (post) => {
        // `${post.title}` +
        // `Product Link: ${post.url}` +
        // `See Comments: https://www.reddit.com/${post.permalink}`.trim()
        return (
            post.title +
            "\n\nProduct Link: " +
            post.url +
            "\n\nSee Comments: https://www.reddit.com/" +
            post.permalink
        );
    };
    const channel = client.channels.cache.get("794367501663600672");

    posts.forEach((post) => channel.send(template(post)));
};

const init = async () => {
    let posts = null;

    try {
        posts = await fetchNewPosts();
        console.log(
            `Fetching new posts at ${new Date().toLocaleTimeString("en-US")}`
        );

        const parsed = await parsePosts(posts);
        if (parsed.length === 0) {
            console.log("No new posts found within last two minutes");
        } else {
            console.log(`${parsed.length} posts found! Sending to Discord...`);
            sendMessages(parsed);
        }

        lastUpdated = Date.now();
    } catch (error) {
        console.log(posts);
        console.error(error);
    }
};
