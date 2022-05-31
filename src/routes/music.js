const express = require("express");
const router = express.Router();
const {
  getAllMusic,
  addMusic,
  getDetailMusic,
  editMusic,
  deleteMusic,
  getAllMusicPagination,
  searchMusic,
} = require("../controller/music");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

router.get("/musics/", getAllMusic);
router.get("/musics/pagination/:page", getAllMusicPagination);
router.get("/music/:id", auth, getDetailMusic);
router.post("/musics/search", searchMusic);
router.post("/music/add", uploadFile(), auth, addMusic);
router.patch("/music/:id", auth, editMusic);
router.delete("/music/:id", auth, deleteMusic);

module.exports = router;
