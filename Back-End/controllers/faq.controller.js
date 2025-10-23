const FAQ = require("../models/faq.model");

const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching FAQs", error: err.message });
  }

}
const addFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    const newFAQ = new FAQ({ question, answer, category });
    await newFAQ.save();

    res.status(201).json({ message: "FAQ added successfully", faq: newFAQ });
  } catch (err) {
    res.status(500).json({ message: "Error adding FAQ", error: err.message });
  }
};

const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    await FAQ.findByIdAndDelete(id);
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting FAQ", error: err.message });
  }
};

module.exports = {
  getAllFAQs,
  addFAQ,
  deleteFAQ
};
