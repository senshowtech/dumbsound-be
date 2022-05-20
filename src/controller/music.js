const { user, music, artist } = require("../../models");

exports.getAllMusic = async (req, res) => {
  try {
    let musics = await music.findAll({
      include: [
        {
          model: artist,
          as: "artists",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
    });
    return res.status(201).json({
      status: "succes",
      data: {
        musics: musics,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

exports.addMusic = async (req, res) => {
  try {
    let musics = await music.create(req.body);
    return res.status(201).json({
      status: "succes",
      data: {
        musics: musics,
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
