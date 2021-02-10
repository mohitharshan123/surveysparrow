const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        console.log(data)
        pool.query(
            `insert into item(type, key_string, link, user_id, ttl) 
                values(?,?,?,?,?)`, [data.type, data.key_string, data.link, data.user_id, data.ttl],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    items: (user_id, callBack) => {
        pool.query(
            `select * from item where user_id = ?`, [user_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
};