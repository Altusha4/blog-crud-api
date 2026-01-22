const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;

        if (!title || title.trim().length === 0) {
            return res.status(400).json({ error: "Validation Error: Title is required" });
        }
        if (!body || body.trim().length === 0) {
            return res.status(400).json({ error: "Validation Error: Body content is required" });
        }

        const blog = await Blog.create({
            title: title.trim(),
            body: body.trim(),
            author: author ? author.trim() : "Anonymous"
        });

        res.status(201).json(blog);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch blogs" });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (title !== undefined && title.trim().length === 0) {
            return res.status(400).json({ error: "Update failed: Title cannot be empty" });
        }
        if (body !== undefined && body.trim().length === 0) {
            return res.status(400).json({ error: "Update failed: Body cannot be empty" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) return res.status(404).json({ error: "Blog post not found" });
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: "Server error during the update" });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error during deletion" });
    }
};