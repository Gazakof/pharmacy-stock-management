const express = require("express");

const router = express.Router();
const Medicine = require("../modeles/Medicine");
const authMiddleware = require("../middleware/middleware_auth");

//Add medicine
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all medicines
router.get("/", authMiddleware, async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update medicine
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updateMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updateMedicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
