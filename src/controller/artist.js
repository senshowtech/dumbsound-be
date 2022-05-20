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

exports.getDetailArtist = async (req, res) => {
  try {
    const id = req.params.id;
    const artists = await artist.findOne({
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
      status: "failed",
    });
  }
};

exports.editArtist = async (req, res) => {
  try {
    const id = req.params.id;
    let artists = await artist.update(req.body, {
      where: {
        id,
      },
    });
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

exports.deleteArtist = async (req, res) => {
  try {
    const id = req.params.id;
    let artists = await artist.destroy({
      where: {
        id,
      },
    });
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
