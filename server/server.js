const express = require("express");
const helmet = require("helmet");

const projectRouter = require("./projectRouter.js");
const actionsRouter = require("./actionsRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Projects and Actions API</h2>`);
});

module.exports = server;
