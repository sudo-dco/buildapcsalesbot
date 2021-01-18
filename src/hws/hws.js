const posts = require("../helpers/posts");
const message = require("../helpers/message");
const ts = require("../helpers/timestamps");

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

        const parsed = newPosts.filter((post) => {
            let match = false;
            const title = post.title
                .substring(0, post.title.indexOf("[W]"))
                .toLowerCase();

            if (post.created > lastUpdated) {
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
        } else {
            const latestTime = parsed[0].created;

            console.log(
                `[HWS] ${parsed.length} posts found! Sending to Discord...`
            );
            message.send(parsed, "hws");
            // update timestamp file
            ts.setTimestamp(latestTime.toString());
            return latestTime;
        }
    } catch (error) {
        console.error("Error with getHWS: ", error);
    }
};

exports.getPosts = getPosts;
