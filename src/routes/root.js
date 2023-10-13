const express = require("express");
const multer = require("multer");
const OpenAI = require("../openai");
//Project cfg
const config = require("../config");
//Dotenv cfg
require("dotenv").config();

const upload = multer({ dest: "uploads" });
const router = express.Router();
const models = { "chatGPT": "gpt-3.5-turbo", "whisper": "whipser-1" };
const openai = new OpenAI(process.env["OPENAI_APIKEY"], {"chatGPT": "gpt-3.5-turbo", });

const RENDER_OPTIONS = {
    project_title: config.PROJECT_NAME,
}

router.get("/", (req, res) => {
    openai.chatGPT.createChatCompletion([{role: "user", content: "Hello world!"}]);
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