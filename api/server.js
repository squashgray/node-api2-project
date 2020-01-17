const express = require("express");
const cors = require("cors");
const postsRouter = require("../hubs/posts"); // imports post router

const server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send(`
    <p>HELLO THERE</p>
  `);
});

server.use("/api/posts", postsRouter); // uses router, "/api/hubs adds this to endpoints in router so we can delete redundant info from router endpoints"

module.exports = server;
