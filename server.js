require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Раздача фронтенда

app.use("/blogs", blogRoutes);

const DB_URI = process.env.MONGO_URI;
const PORT = 3000;

mongoose.connect(DB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    })
    .catch(err => console.error("Database connection error:", err));