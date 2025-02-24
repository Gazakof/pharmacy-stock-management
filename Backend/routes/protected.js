const express = require("express");
const auth = require("../middleware/middleware_auth");

const router = express.Router();

router.get("/dashboard", auth, (req, res) => {
  res.json({ message: `Welcome ${req.user.id}` });
});

module.exports = router;
