const posts = require("../helpers/posts");
const message = require("../helpers/message");
const fs = require("../helpers/fs");

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
    "prebuilt",
    "networking",
];

const getPosts = async (lastUpdated) => {
    try {
        const newPosts = await posts.fetchNew("buildapcsales");

        const parsed = newPosts.filter((post) => {
            const title = post.title;
            const splitTitle = title.split(" ");
            const tag = splitTitle[0]
                .substring(1, splitTitle[0].length - 1)
                .toLowerCase();

            if (post.created > lastUpdated || lastUpdated === null) {
                if (BPSKeywords.includes(tag)) {
                    return post;
                }
            }
        });

        if (parsed.length === 0) {
            console.log("[BPS] No new posts found within last five minutes");

            return newPosts[0].created;
        } else {
            const latestTime = parsed[0].created;

            console.log(
                `[BPS] ${parsed.length} posts found! Sending to Discord...`
            );
            message.send(parsed, "bps");

            return latestTime;
        }
    } catch (error) {
        console.error("Error with BPS getPosts");
        fs.setErrorLog(error.toString());
        return 1;
    }
};

exports.getPosts = getPosts;
