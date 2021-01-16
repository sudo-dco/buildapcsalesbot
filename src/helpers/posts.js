const clients = require("../helpers/clients");

const fetchNewPosts = (subreddit) => {
    return clients.snoowrap
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

exports.fetchNew = fetchNewPosts;
