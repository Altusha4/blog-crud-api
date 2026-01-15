const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;

        if (!title || !body) {
            return res.status(400).json({ error: "Title and body are required" });
        }

        const blog = await Blog.create({ title, body, author });
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
const updateBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;

        if (!title || !body) {
            return res.status(400).json({ error: "Title and body are required" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, body, author },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog };