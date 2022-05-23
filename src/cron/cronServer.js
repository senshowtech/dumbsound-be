const cron = require("node-cron");
const { transaction, music, user } = require("../../models");

cron.schedule("1 * * * * *", () => {
  getAllTransactionAdmin();
});

const getAllTransactionAdmin = async (req, res) => {
  try {
    const dataTransaction = await transaction.findAll({
      attributes: {
        exclude: ["updatedAt"],
      },
    });
    dataTransaction.forEach((element) => {
      let dateDb = new Date(element.endDate);
      let dateNow = new Date();
    });
  } catch (error) {
    console.log(error);
  }
};
