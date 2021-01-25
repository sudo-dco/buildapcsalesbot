const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const testPosts = require("../../tests/posts.test.js");

let db = new sqlite3.Database(path.resolve(__dirname, "./posts.db"), (err) => {
    if (err) {
        console.error(err.message);
    }

    console.log("Connected to posts database");
});

const tables = {
    bps: "bpsPosts",
    hws: "hwsPosts",
};

const createTables = () => {
    db.serialize(() => {
        db.run(
            "CREATE TABLE bpsPosts(postID text NOT NULL PRIMARY KEY, postCreated int)",
            (err) => {
                if (err) {
                    console.error("Error creating bps table: ");
                    throw err;
                }
            }
        );

        db.run(
            "CREATE TABLE hwsPosts(postID text NOT NULL PRIMARY KEY, postCreated int)",
            (err) => {
                if (err) {
                    console.error("Error creating hws table: ");
                    throw err;
                }
            }
        );
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }

        console.log("Closed database connection");
    });
};

const insertOne = (postID, postCreated, tableName) => {
    db.run(
        `INSERT INTO ${tables[tableName]}(postID, postCreated) VALUES(?, ?)`,
        [postID, postCreated],
        (err) => {
            if (err) {
                console.log("Error inserting record: ");
                throw err;
            }
        }
    );

    db.close();
};

const insertMany = (posts, tableName) => {
    posts.forEach((post) => {
        insertOne(post.id, post.created, tableName);
    });

    db.close();
};

/*
    Retrieve one record from database
    @param {string} postID - ID of post
    @param {string} tableName - name of db table
    @return {object} postID, postCreated
*/
const getOne = (postID, tableName) => {
    const data = new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM ${tables[tableName]} WHERE postID = ?`,
            postID,
            (err, row) => {
                if (err) {
                    console.error("Error finding record");
                    throw err;
                }

                if (row) {
                    resolve(row);
                } else {
                    resolve(null);
                }
            }
        );
    });

    db.close();
    return data;
};

/*
    Retrieve the 25 newest records from database table
    @param {string} tableName - name of db table
    @return {array.<Object>} objects postID, postCreated
*/
const getMany = (tableName) => {
    const data = new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM ${tables[tableName]} ORDER BY ? DESC LIMIT ?`,
            ["postCreated", 5],
            (err, rows) => {
                if (err) {
                    console.error("Error finding record");
                    throw err;
                }

                if (rows) {
                    resolve(rows);
                } else {
                    resolve(null);
                }
            }
        );
    });

    db.close();
    return data;
};

/*
    Retrieve record count of database table
    @param {string} tableName - name of db table
    @return {int} data - number of records
*/
const getCount = (tableName) => {
    const data = new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(*) FROM ${tables[tableName]}`, [], (err, data) => {
            if (err) {
                console.error("Error getting record count");
            }

            resolve(data["COUNT(*)"]);
        });
    });

    db.close();
    return data;
};

/*
    Delete 500 oldest records in database table
    @param {string} tableName - name of db table
*/
const deleteOldRecords = (tableName) => {
    db.run(
        `DELETE FROM ${tables[tableName]} ORDER BY ? LIMIT ?`,
        ["postCreated", 500],
        (err) => {
            if (err) {
                console.error("Error inserting record: ");
                throw err;
            }
        }
    );

    console.log(
        `Oldest 500 records removed from ${tables[tableName]} database`
    );
    db.close();
};

const deleteAllRecords = (tableName) => {
    db.run(`DELETE FROM ${tables[tableName]}`, (err) => {
        if (err) {
            console.error("Error inserting record: ");
            throw err;
        }
    });

    console.log(`All records deleted from ${tables[tableName]}`);
    db.close();
};

// createTables();
// insertAll(testPosts.bps, "bps");
// insertAll(testPosts.hws, "hws");
// getMany("bps").then((res) => console.log(res));
// getCount("hws").then((res) => console.log(res));

exports.insertOne = insertOne;
exports.insertMany = insertMany;
exports.getMany = getMany;
exports.getCount = getCount;
