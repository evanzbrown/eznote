const { OpenAI, toFile } = require("openai");

class OpenAIController {
    constructor(apiKey, models) {
        this.openai = new OpenAI({
            apiKey: apiKey
        });
        this.models = models;
        console.log(`[+] Created new OpenAIController instance with API key: ${apiKey}`);
        console.log(`[+] Using chatGPT model: ${this.models["chatGPT"]}`);
        console.log(`[+] Using whisper model: ${this.models["whisper"]}`);
    }

    transcribeAudio(audioFile) {
        return new Promise((resolve, reject) => {
            toFile(audioFile.buffer, audioFile.originalname).then(fileObject => {
                return this.openai.audio.transcriptions.create({ model: this.models["whisper"], file: fileObject });
            }).then(resp => {
                if (resp["text"] == undefined) { reject("Transcription did not yield a response."); return; }
                console.log(`[+] Created transcription: ${resp["text"].substring(0, 50)}`);
                resolve(resp["text"]);
            });
        });
    }

    createMessageCompletion(messages) {
        return new Promise((resolve, reject) => {
            this.openai.chat.completions.create({ model: this.models["chatGPT"], messages: messages }).then(resp => {
                console.log(`[+] Created chat completion with model: ${resp.model}, usage: ${JSON.stringify(resp.usage)}`);
                if (resp.choices == undefined) { reject("Chat completion did not yield a valid response."); return; }
                for (let i in resp.choices) {
                    const choice = resp.choices[i];
                    if (choice.finish_reason == "stop") resolve(choice.message);
                }
                reject("Chat completion did not yield a valid response.");
            });
        });
    }
}

module.exports = OpenAIController;