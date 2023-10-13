const axios = require("axios");

const API_URL = "https://api.openai.com/v1/chat/completions";

class ChatGPT {
    constructor(apiKey, model) {
        this.apiKey = apiKey;
        this.model = model;
        this.axios = axios.default;
    }

    getAxiosConfig() {
        return {
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "application/json"
            }
        };
    }

    createChatCompletion(messages) {
        const formData = { model: this.model, messages: messages };
        console.log(this.getAxiosConfig())
        this.axios.post(API_URL, formData, this.getAxiosConfig()).then(resp => {
            console.log(resp);
        });
    }
}

module.exports = ChatGPT;