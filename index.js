require("dotenv").config();
const express = require("express");

const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const routesMusic = require("./src/routes/music");
const routesArtist = require("./src/routes/artist");
const routesUser = require("./src/routes/user");
const routesTransaction = require("./src/routes/transaction");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], 
  },
});

require("./src/socket")(io);
// nyalain lg nanti jgn lupa
// require("./src/cron/cronServer");

const port = process.env.Port;

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/", routesMusic, routesArtist, routesUser, routesTransaction);

server.listen(port, () => console.log(`Listening on port ${port}`));
