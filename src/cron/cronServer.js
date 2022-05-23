const cron = require("node-cron");
const { transaction } = require("../../models");

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
      if (
        dateDb.getDate() === dateNow.getDate() &&
        dateDb.getMonth() === dateNow.getMonth() &&
        dateDb.getFullYear() === dateNow.getFullYear()
      ) {
        updateTransaction("failed", element.id);
        console.log(element.status);
      }
      if (element.status === "failed") {
        updateEndDate("null", element.id);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTransaction = async (status, transactionId) => {
  await transaction.update(
    {
      status,
    },
    {
      where: {
        id: transactionId,
      },
    }
  );
};

const updateEndDate = async (endDate, transactionId) => {
  await transaction.update(
    {
      endDate,
    },
    {
      where: {
        id: transactionId,
      },
    }
  );
};
