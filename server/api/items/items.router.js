const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")
const { createItem, listItems } = require("./items.controller");

router.post("/", checkToken, createItem);
router.get("/", checkToken, listItems);

module.exports = router;