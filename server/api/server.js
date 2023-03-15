const express = require("express");
const app = express();
const likedRouter = require("./Liked/Liked-router");
const postRouter = require("./Post/Post-router");
const userRouter = require("./User/User-router");
const followRouter = require("./Follow/UserFollow");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use("/user/liked", likedRouter);

app.use("/user/post", postRouter);

app.use("/user", userRouter);

app.use("/user/follow", followRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
