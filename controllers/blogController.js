const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;

        if (!title || title.trim().length === 0) {
            return res.status(400).json({ error: "Validation failed: Title cannot be empty or just whitespace" });
        }
        if (!body || body.trim().length === 0) {
            return res.status(400).json({ error: "Validation failed: Body content cannot be empty" });
        }

        const blog = await Blog.create({
            title: title.trim(),
            body: body.trim(),
            author: author && author.trim().length > 0 ? author.trim() : "Anonymous"
        });

        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ error: "Server error while creating the post" });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (title !== undefined && title.trim().length === 0) {
            return res.status(400).json({ error: "Title cannot be empty" });
        }
        if (body !== undefined && body.trim().length === 0) {
            return res.status(400).json({ error: "Body cannot be empty" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title: title ? title.trim() : undefined,
                body: body ? body.trim() : undefined,
                author: req.body.author ? req.body.author.trim() : undefined
            },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) return res.status(404).json({ error: "Post not found" });
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: "Server error during the update" });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: "Error fetching data" });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error during deletion" });
    }
};