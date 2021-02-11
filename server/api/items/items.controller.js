const { create, items } = require("./items.service");
const atob = require("atob");

getUserIdFromToken = (token) => {
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userId = JSON.parse(rawPayload).result.registration_id;
    return userId;
}

module.exports = {
    createItem: (req, res) => {
        const token = req.headers.authorization;
        const userId = getUserIdFromToken(token)
        const body = {
            ...req.body,
            user_id: userId
        };
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
        const userId = getUserIdFromToken(token)
        items(userId, (err, results) => {
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