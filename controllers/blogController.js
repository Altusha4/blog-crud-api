const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body) return res.status(400).json({ error: "Title and body are required" });
        const blog = await Blog.create({ title, body, author });
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};