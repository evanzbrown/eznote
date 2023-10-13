const ChatGPT = require("./chatgpt");
const Whisper = require("./whipser");

class OpenAI {
    constructor(apiKey, models) {
        this.chatGPT = new ChatGPT(apiKey, models["chatGPT"]);
        this.whipser = new Whisper(apiKey, models["whisper"]);
        console.log(`[+] Created new OpenAI instance with API key: ${apiKey}`);
    }
}

module.exports = OpenAI;