const express = require("express");
const multer = require("multer");
const OpenAIController = require("../openai-controller");
const config = require("../config");
const fs = require("fs");
const mdtopdf = require("md-to-pdf");
require("dotenv").config();

const upload = multer();
const router = express.Router();
const openai = new OpenAIController(process.env["OPENAI_APIKEY"], config.MODELS);

const RENDER_OPTIONS = {
    project_title: config.PROJECT_NAME,
}

function createRenderOptions(options) {
    if (options == undefined) options = {};
    let result = options;
    result["project_title"] = config.PROJECT_NAME;
    return result;
}

router.get("/", (req, res) => {
    res.render("index", createRenderOptions());
});

router.post("/upload", upload.single("file"), (req, res) => {
    if (req.file == undefined) { res.render("index", createRenderOptions({error: "No file was submitted."})); return; }
    openai.transcribeAudio(req.file).then(text => {
        let messages = config.BASE_PROMPT;
        messages.push({ role: "user", content: text});
        return openai.createMessageCompletion(messages);
    }).then(message => {
        return mdtopdf.mdToPdf({ content: message.content }, { dest: "notes/note.pdf" });
    }).then(() => {
        res.download("notes/note.pdf");
    }).catch(err => {
        res.render("index", createRenderOptions({error: err}));
    });
});

router.get("/about", (req, res) => {
    res.render("about", createRenderOptions());
});

module.exports = router;