const { artist } = require("../../models");

exports.getAllArtist = async (req, res) => {
  try {
    let artists = await artist.findAll();
    return res.status(201).json({
      status: "succes",
      data: {
        artists: artists,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

exports.addArtist = async (req, res) => {
  try {
    let artists = await artist.create(req.body);
    return res.status(201).json({
      status: "succes",
      data: {
        artists: artists,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "succes",
      data: {
        musics: musics,
      },
    });
  }
};
