const fsPromises = require("fs").promises;
const path = require("path");

/*
    Write to error log
    @param {string} data - error message
    @param {string} dir - directory to write logs to
*/
const setErrorLog = async (data, dir) => {
    let dirPath = null;

    switch (dir) {
        case "bps":
            dirPath = path.resolve(__dirname, "../bps/error.log");
        case "hws":
            dirPath = path.resolve(__dirname, "../hws/error.log");
    }

    try {
        await fsPromises.writeFile(dirPath, data, {
            flag: "a+",
        });

        return 0;
    } catch (err) {
        console.error("Error with writing to error log: ", err);
    }
};

/*
    Write to timestamp file
    @param {array} times - unix time of last check for bps and hws subreddits
*/
const setTimestamp = async (time) => {
    try {
        await fsPromises.writeFile(
            path.resolve(__dirname, "timestamps.txt"),
            time,
            { flag: "r+" }
        );

        return 0;
    } catch (err) {
        console.error("Error with writing to timestamp file: ", err);
    }
};

/* 
    Read from timestamp.txt
    @return {array} of last updated times in unix time
*/
const getTimestamp = async () => {
    try {
        const data = await fsPromises.readFile(
            path.resolve(__dirname, "timestamps.txt"),
            "utf8"
        );

        return data;
    } catch (err) {
        console.error("Error with reading timestamp file: ", err);
    }
};

module.exports = {
    setTimestamp,
    getTimestamp,
    setErrorLog,
};
