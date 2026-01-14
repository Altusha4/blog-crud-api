require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const http = require("node:http");
const app = express()

const DB_URI = process.env.MONGO_URI;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("works!")
})
mongoose.connect(DB_URI)
    .then(() => {
        console.log("Connected")

        app.listen(3000, () => console.log("http://localhost:3000"))
    })
