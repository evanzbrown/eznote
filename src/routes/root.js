const express = require("express");
const multer = require("multer");
const fs = require("fs");
const OpenAI = require("../openai");
//Project cfg
const config = require("../config");
//Dotenv cfg
require("dotenv").config();

const upload = multer();
const router = express.Router();
const openai = new OpenAI(process.env["OPENAI_APIKEY"], config.MODELS);

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
    if (req.file == undefined) { res.render("upload", RENDER_OPTIONS); return; }
    openai.whipser.transcribe(req.file).then(transcription => {
    });
    res.status(200).end();
});

module.exports = router;