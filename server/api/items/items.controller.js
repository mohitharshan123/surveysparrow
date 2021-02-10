const { create, items } = require("./items.service");
const atob = require("atob");

module.exports = {
    createItem: (req, res) => {
        const body = req.body;

        create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },

    listItems: (req, res) => {
        const token = req.headers.authorization;
        const tokenParts = token.split(".");
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const user = JSON.parse(rawPayload).result;
        items(user.registration_id, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "No data",
                });
            }
            if (results) {
                return res.json({
                    success: 1,
                    items: results,
                });
            }
        });
    }
};