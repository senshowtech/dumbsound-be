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
router.get("/music/:id", auth, getDetailMusic);
router.post("/music/add", uploadFile(), auth, addMusic);
router.patch("/music/:id", auth, editMusic);
router.delete("/music/:id", auth, deleteMusic);

module.exports = router;
