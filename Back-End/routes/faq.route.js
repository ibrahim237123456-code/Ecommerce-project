const express = require("express");
const router = express.Router();
const {
  getAllFAQs,
  addFAQ,
  deleteFAQ
} = require("../controllers/faq.controller");

router.get("/", getAllFAQs);
router.post("/", addFAQ);
router.delete("/:id", deleteFAQ);

module.exports = router;
