const express = require("express");
const multer = require("multer");
//Project cfg
const config = require("../config");
//Dotenv cfg
require("dotenv").config();

const upload = multer({ dest: "uploads" });
const router = express.Router();

const RENDER_OPTIONS = {
    project_title: config.PROJECT_NAME,
}

router.get("/", (req, res) => {
    res.render("index", RENDER_OPTIONS);
});

router.get("/upload", (req, res) => {
    res.render("upload", RENDER_OPTIONS);
});

router.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.status(200).end();
});

module.exports = router;