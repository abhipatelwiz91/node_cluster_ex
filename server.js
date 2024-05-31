const cluster = require("cluster");
const os = require("os");
const express = require("express");

const totalCpus = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const port = 3321;

  app.get("/", (req, res) => {
    return res.json({
      message: `Hello from express cluster server and pid is ${process.pid}`,
    });
  });

  app.listen(port, () => {
    console.log("server is running at :", port);
  });
}
