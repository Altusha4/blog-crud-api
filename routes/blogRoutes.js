const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs } = require("../controllers/blogController");

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);

module.exports = router;