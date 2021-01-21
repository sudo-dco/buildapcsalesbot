const posts = require("../helpers/posts");
const message = require("../helpers/message");
const fs = require("../helpers/fs");

const HWSKeywords = [
    "usa-wa",
    "gpu",
    "gtx",
    "b550",
    "ryzen",
    "rtx",
    "x570",
    "sfx",
    "case",
    "itx",
    "i7",
    "ram",
    "noctua",
    "ddr4",
    "xeon",
    "psu",
    "fan",
    "fans",
    "intel",
];

const getPosts = async (lastUpdated) => {
    try {
        const newPosts = await posts.fetchNew("hardwareswap");

        const parsed = await newPosts.filter((post) => {
            let match = false;
            const title = post.title
                .substring(0, post.title.indexOf("[W]"))
                .toLowerCase();

            if (post.created > lastUpdated || lastUpdated === null) {
                HWSKeywords.forEach((word) => {
                    if (title.includes(word)) {
                        match = true;
                    }
                });
            }

            if (match) return post;
        });

        if (parsed.length === 0) {
            console.log("[HWS] No new posts found within last five minutes");

            return newPosts[0].created;
        } else {
            const latestTime = parsed[0].created;

            console.log(
                `[HWS] ${parsed.length} posts found! Sending to Discord...`
            );
            message.send(parsed, "hws");

            return latestTime;
        }
    } catch (error) {
        console.error("Error with HWS getPosts");
        fs.setErrorLog(error.toString(), "hws");
        return 1;
    }
};

exports.getPosts = getPosts;
