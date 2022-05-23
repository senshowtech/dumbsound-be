const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  AddTransaction,
  getAllTransactionAdmin,
  notification,
} = require("../controller/transaction");

router.post("/transaction", auth, AddTransaction);
router.get("/transactions", auth, getAllTransactionAdmin);
router.post("/notification", notification);

module.exports = router;
