const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.send("POST /blogs works");
});

module.exports = router;
