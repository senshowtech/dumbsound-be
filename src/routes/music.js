const express = require("express");
const router = express.Router();
const {
  getAllMusic,
  addMusic,
  getDetailMusic,
  editMusic,
  deleteMusic,
} = require("../controller/music");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

router.get("/musics/", getAllMusic);
router.get("/music/:id", getDetailMusic);
router.post("/music/add", addMusic);
router.post("/upload/file/music/", uploadFile("images"));
router.patch("/music/:id", editMusic);
router.delete("/music/:id", deleteMusic);

module.exports = router;
