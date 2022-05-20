const express = require("express");
const router = express.Router();
const {
  getAllArtist,
  addArtist,
  getDetailArtist,
  editArtist,
  deleteArtist,
} = require("../controller/artist");

router.get("/artists/", getAllArtist);
router.get("/artist/:id", getDetailArtist);
router.post("/artist/add", addArtist);
router.patch("/artist/:id", editArtist);
router.delete("/artist/:id", deleteArtist);

module.exports = router;
