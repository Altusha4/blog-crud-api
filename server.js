require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const blogRoutes = require("./routes/blogRoutes");

const app = express()

app.use(express.static("public"));
const DB_URI = process.env.MONGO_URI;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/blogs", blogRoutes)
app.get('/', (req, res) => {
    res.send("works!")
})
mongoose.connect(DB_URI)
    .then(() => {
        console.log("Connected")
        app.listen(3000, () => console.log("http://localhost:3000"))
    })
    .catch(err => console.error(err))
