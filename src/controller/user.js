const { user } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Register = async (req, res) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().min(3).required(),
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
      status: Joi.string(),
      gender: Joi.string().required(),
      phone: Joi.string().min(11).required(),
      address: Joi.string().min(11).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      let path = error.details[0].path;
      let errors = "";
      if (String(path) === "email") {
        errors = "masukkan email valid";
      } else if (String(path) === "fullname") {
        errors = "nama tidak boleh kosong dan minimal 3 karakter";
      } else if (String(path) === "password") {
        errors = "password minimal 6 karakter";
      } else if (String(path) === "gender") {
        errors = "gender tidak boleh kosong";
      } else if (String(path) === "phone") {
        errors = "masukkan nomor yang valid minimal 11 karakter";
      } else if (String(path) === "address") {
        errors = "alamat tidak boleh kosong";
      }

      return res.status(400).json({
        status: "failed",
        message: errors,
      });
    }

    const usersCheck = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    if (usersCheck != null) {
      return res.status(500).json({
        status: "failed",
        message: "Email sudah di gunakan",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.Token);

    return res.status(201).json({
      status: "success",
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          status: newUser.status,
          token: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      let path = error.details[0].path;
      let errors = "";
      if (String(path) === "email") {
        errors = "email tidak boleh kosong dan minimal 5 karakter";
      } else if (String(path) === "password") {
        errors = "password minimal 6 karakter";
      }

      return res.status(400).json({
        status: "failed",
        message: errors,
      });
    }

    const usersCheck = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (usersCheck === null) {
      return res.status(400).send({
        status: "failed",
        message: "Email atau password tidak sama",
      });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      usersCheck.password
    );

    if (checkPassword === false) {
      return res.status(400).send({
        status: "failed",
        message: "Email or password not match",
      });
    }

    const token = jwt.sign({ id: usersCheck.id }, process.env.Token);

    return res.status(201).json({
      status: "success",
      data: {
        user: {
          id: usersCheck.id,
          name: usersCheck.name,
          email: usersCheck.email,
          status: usersCheck.status,
          token: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error: "server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let users = await user.findOne({
      where: {
        id: req.user.id,
      },
    });
    return res.status(201).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error: "server error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    const token = jwt.sign({ id: dataUser.id }, process.env.Token);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          status: dataUser.status,
          token: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};
