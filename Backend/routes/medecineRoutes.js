const express = require("express");

const router = express.Router();
const Medecine = require("../modeles/Medecine");
const authMiddleware = require("../middleware/middleware_auth");

//Add medecine
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newMedecine = new Medecine(req.body);
    const savedMedicine = await newMedecine.save();
    res.status(201).json(savedMedicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get all medecines
router.get("/", authMiddleware, async (req, res) => {
  try {
    const medecines = await Medecine.find();
    res.json(medecines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Update medecine
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updateMedecine = await Medecine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updateMedecine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Medecine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medecine deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
