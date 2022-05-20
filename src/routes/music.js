const express = require("express");
const router = express.Router();
const { getAllMusic, addMusic } = require("../controller/music");

router.get("/musics/", getAllMusic);
router.post("/music/add", addMusic);

module.exports = router;
