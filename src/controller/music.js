const { music, artist } = require("../../models");

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

exports.getDetailMusic = async (req, res) => {
  try {
    const id = req.params.id;
    const musics = await music.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
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
    // let musics = await music.create(req.body);
    // return res.status(201).json({
    //   status: "succes",
    //   data: {
    //     musics: musics,
    //   },
    // });
    return res.status(201).json({
      status: "succes",
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

exports.editMusic = async (req, res) => {
  try {
    const id = req.params.id;
    let musics = await music.update(req.body, {
      where: {
        id,
      },
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

exports.deleteMusic = async (req, res) => {
  try {
    const id = req.params.id;
    let musics = await music.destroy({
      where: {
        id,
      },
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
