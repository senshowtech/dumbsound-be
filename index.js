require("dotenv").config();
const express = require("express");

const cors = require("cors");

const routesMusic = require("./src/routes/music");
const routesArtist = require("./src/routes/artist");

const app = express();

const port = process.env.Port;

app.use(express.json());
app.use(cors());

app.use("/api/v1/", routesMusic, routesArtist);

app.listen(port, () => console.log(`Listening on port ${port}`));
