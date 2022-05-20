const express = require("express");
const router = express.Router();
const { getAllArtist, addArtist } = require("../controller/artist");

router.get("/artists/", getAllArtist);
router.post("/artist/add", addArtist);

module.exports = router;
