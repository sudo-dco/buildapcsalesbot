const clients = require("./clients");
const fs = require("./fs");
const db = require("../db/db");

const initials = {
    bps: "buildapcsales",
    hws: "hardwareswap",
    hls: "homelabsales",
};

const fetchNewPosts = async (subreddit) => {
    try {
        const posts = await clients.snoowrap
            .getSubreddit(subreddit)
            .getNew()
            .map((post) => ({
                title: post.title,
                id: post.id,
                url: post.url,
                created: post.created,
                permalink: post.permalink,
            }));

        return posts;
    } catch (error) {
        console.log("Error fetching posts");
        fs.setErrorLog(error.toString());
    }
};

const parse = async (subreddit) => {
    try {
        const newPosts = await fetchNewPosts(initials[subreddit]);
        const latestPost = await db.getLatest(subreddit);

        return [newPosts, latestPost];
    } catch (error) {
        console.error("Error with parse: ", parse);
    }
};

exports.fetchNew = fetchNewPosts;
exports.parse = parse;
