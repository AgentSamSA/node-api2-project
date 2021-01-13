const express = require("express");
const postRouter = require("./posts-routers");
const server = express();

server.use(express.json());
server.use("/api/posts", postRouter);

module.exports = server;