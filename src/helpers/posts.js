const clients = require("./clients");
const fs = require("./fs");
const db = require("../db/db");

const convertAcronym = {
    bps: "buildapcsales",
    hws: "hardwareswap",
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
    const newPosts = await fetchNewPosts(convertAcronym[subreddit]);

    const savedPosts = await db.getMany(subreddit);
};

exports.fetchNew = fetchNewPosts;
