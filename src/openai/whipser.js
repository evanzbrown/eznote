const axios = require("axios");

//https://platform.openai.com/docs/api-reference/audio/createTranscription

const API_URL = "https://api.openai.com/v1/audio/transcriptions";

class Whisper {
    constructor(apiKey) {
        this.apiKey = apiKey;
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
        formData.append("file", audioFile);
        formData.append("model", "whipser-1");
        formData.append("response_format", "text");
        this.axios.post(API_URL, formData, this.getAxiosConfig()).then(resp => {
            console.log(resp);
        });
    }
}

module.exports = Whisper;