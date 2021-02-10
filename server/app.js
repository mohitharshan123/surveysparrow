require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const itemsRouter = require("./api/items/items.router");

var cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/items", itemsRouter);

const port = process.env.PORT || 4021;
app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});