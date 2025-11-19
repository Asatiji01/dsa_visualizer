const express = require('express');
const router = express.Router();
const Theory = require('../models/Theory');

// GET THEORY FROM MONGO DB
router.get('/:algo', async (req, res) => {
  try {
    const item = await Theory.findOne({ algo: req.params.algo });

    if (!item) {
      return res.status(404).json({ message: "Theory not found" });
    }

    res.json(item);
  } catch (err) {
    console.error("THEORY ERROR:", err);
    res.status(500).json({ message: "Server error while fetching theory" });
  }
});

module.exports = router;
