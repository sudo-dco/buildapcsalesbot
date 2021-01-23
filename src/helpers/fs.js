const fsPromises = require("fs").promises;
const path = require("path");

const dirPaths = {
    bps: path.resolve(__dirname, "../bps"),
    hws: path.resolve(__dirname, "../hws"),
};

/*
    Write to error log
    @param {string} data - error message
    @param {string} dir - directory to write logs to
*/
const setErrorLog = async (data, dir) => {
    try {
        await fsPromises.writeFile(`${dirPaths[dir]}/error.log`, data, {
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
const setTimestamp = async (time, dir) => {
    try {
        await fsPromises.writeFile(`${dirPaths[dir]}/timestamp.log`, time, {
            flag: "w+",
        });

        return 0;
    } catch (err) {
        console.error("Error with writing to timestamp file: ", err);
    }
};

/* 
    Read from timestamp.txt
    @return {array} of last updated times in unix time
*/
const getTimestamp = async (dir) => {
    try {
        const data = await fsPromises.readFile(
            `${dirPaths[dir]}/timestamp.log`,
            "utf8"
        );

        return data;
    } catch (err) {
        if (err.code === "ENOENT") {
            // timestamp file doesn't exist yet
            return null;
        } else {
            console.error("Error with reading timestamp file: ", err);
        }
    }
};

module.exports = {
    setTimestamp,
    getTimestamp,
    setErrorLog,
};
