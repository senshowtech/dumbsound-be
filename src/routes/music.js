const express = require("express");
const router = express.Router();
const {
  getAllMusic,
  addMusic,
  getDetailMusic,
  editMusic,
  deleteMusic,
} = require("../controller/music");

router.get("/musics/", getAllMusic);
router.get("/music/:id", getDetailMusic);
router.post("/music/add", addMusic);
router.patch("/music/:id", editMusic);
router.delete("/music/:id", deleteMusic);

module.exports = router;
