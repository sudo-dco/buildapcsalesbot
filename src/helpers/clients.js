const path = require("path");
const snoowrap = require("snoowrap");
const Discord = require("discord.js");
require("dotenv").config({ path: path.resolve(__dirname, "../../env/.env") });

const client = new Discord.Client();
const requester = new snoowrap({
    userAgent: process.env.USERAGENT,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// client.on("message", (msg) => {
//     if (msg.content === "ping") {
//         msg.reply("pong");
//     }
// });

client.login(process.env.TOKEN);

exports.snoowrap = requester;
exports.discord = client;
