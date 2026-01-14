const express = require("express");
const router = express.Router();
const { createBlog } = require("../controllers/blogController");
const { createBlog, getAllBlogs } = require("../controllers/blogController");

router.post("/", createBlog);
router.get("/", getAllBlogs);

module.exports = router;