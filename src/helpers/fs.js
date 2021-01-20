const fsPromises = require("fs").promises;
const path = require("path");

/*
    Write to error log
    @param {array} data - error message
*/
const setErrorLog = async (data) => {
    try {
        await fsPromises.writeFile(path.resolve(__dirname, "error.log"), data, {
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
