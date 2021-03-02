const posts = require("../helpers/posts");
const message = require("../helpers/message");
const fs = require("../helpers/fs");

const HLSKeywords = ["[FS]", "[US-", "[USA-"];

const getPosts = async () => {
    try {
        const [newPosts, latestPost] = await posts.parse("hls");

        const parsed = newPosts.filter((post) => {
            let hasKeyword = false;

            if (post.created > latestPost[0].postCreated) {
                HLSKeywords.forEach((key) => {
                    if (post.title.includes(key)) {
                        hasKeyword = true;
                    }
                });
            }

            if (hasKeyword) return post;
        });

        if (parsed.length === 0) {
            console.log("[HLS] No new posts found within last five minutes");
        } else {
            console.log(
                `[HLS] ${parsed.length} posts found! Sending to Discord...`
            );

            message.send(parsed, "hls");
        }
    } catch (error) {
        console.error("Error with HLS getPosts: ", error);
        fs.setErrorLog(error.toString(), "hls");
    }
};

exports.getPosts = getPosts;
