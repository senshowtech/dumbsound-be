const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  AddTransaction,
  getAllTransactionAdmin,
  getAllTransactionUser,
  notification,
} = require("../controller/transaction");

router.post("/transaction", auth, AddTransaction);
router.get("/transactions", auth, getAllTransactionAdmin);
router.get("/transactions/user", auth, getAllTransactionUser);
router.post("/notification", notification);

module.exports = router;
