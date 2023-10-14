const axios = require("axios");

//https://platform.openai.com/docs/api-reference/audio/createTranscription

const API_URL = "https://api.openai.com/v1/audio/transcriptions";

class Whisper {
    constructor(apiKey, model) {
        this.apiKey = apiKey;
        this.model = model;
        this.axios = axios.default;
    }
    
    getAxiosConfig() {
        return {
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "multipart/form-data"
            }
        };
    }

    transcribe(audioFile) {
        let formData = new FormData();
        formData.append("model", this.model);
        formData.append("file", new Blob([audioFile.buffer]), { filename: audioFile.originalname });
        return new Promise((resolve, reject) => {
            this.axios.post(API_URL, formData, this.getAxiosConfig()).then(resp => {
                console.log(resp);
            });
        });
    }
}

module.exports = Whisper;