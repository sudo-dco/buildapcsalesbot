const clients = require("../helpers/clients");

const bpsChannelID = "794367501663600672";
const hwsChannelID = "795863235215360001";
const hlsChannelID = "816394154325966869";

const sendMessages = (posts, subreddit) => {
    let channel = null;

    switch (subreddit) {
        case "bps":
            channel = clients.discord.channels.cache.get(bpsChannelID);
            posts.forEach((post) =>
                channel.send(
                    post.title +
                        "\n\nProduct Link: " +
                        post.url +
                        "\n\nSee Comments: https://www.reddit.com/" +
                        post.permalink
                )
            );
            break;
        case "hws":
            channel = clients.discord.channels.cache.get(hwsChannelID);
            posts.forEach((post) =>
                channel.send(
                    post.title +
                        "\n\nSee Comments: https://www.reddit.com/" +
                        post.permalink
                )
            );
            break;
        case "hls":
            channel = clients.discord.channels.cache.get(hlsChannelID);
            posts.forEach((post) =>
                channel.send(
                    post.title +
                        "\n\nSee Comments: https://www.reddit.com/" +
                        post.permalink
                )
            );
            break;
    }
};

const deleteMessages = (channel) => {
    let channelObj = null;

    switch (channel) {
        case "bps":
            channelObj = clients.discord.channels.cache.get(bpsChannelID);
            channelObj.bulkDelete(100);
            console.log("BPS Channel Cleared");
            break;
        case "hws":
            channelObj = clients.discord.channels.cache.get(hwsChannelID);
            channelObj.bulkDelete(100);
            console.log("HWS Channel Cleared");
            break;
    }
};

exports.send = sendMessages;
exports.delete = deleteMessages;
