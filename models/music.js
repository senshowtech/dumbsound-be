"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      music.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "userId",
        },
      });

      music.belongsTo(models.artist, {
        as: "artists",
        foreignKey: {
          name: "artistId",
        },
      });
    }
  }
  music.init(
    {
      title: DataTypes.STRING,
      year: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      attache: DataTypes.STRING,
      artistId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "music",
    }
  );
  return music;
};
