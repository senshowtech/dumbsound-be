const { music, artist } = require("../../models");
const { Op } = require("sequelize");

exports.searchMusic = async (req, res) => {
  try {
    let dataTitle = await music.findAll({
      include: [
        {
          model: artist,
          as: "artists",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    let search = dataTitle.filter((value) => {
      return value.title
        .toLocaleLowerCase()
        .includes(req.body.title.toLocaleLowerCase());
    });
    return res.status(201).json({
      status: "succes",
      musics: search,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllMusicPagination = async (req, res) => {
  try {
    let musics = await music.findAndCountAll({
      offset: (req.params.page - 1) * 8,
      limit: 8,
      include: [
        {
          model: artist,
          as: "artists",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    return res.status(201).json({
      status: "succes",
      musics: musics,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error: "server error",
    });
  }
};

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
    let musics = await music.create({
      ...req.body,
      thumbnail: process.env.url + req.files.thumbnail[0].filename,
      attache: process.env.url + req.files.song[0].filename,
      userId: req.user.id,
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
