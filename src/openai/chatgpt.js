const axios = require("axios");

const API_URL = "https://api.openai.com/v1/chat/completions";
//https://platform.openai.com/docs/api-reference/chat/create

/*
ChatGPT chat completion request structure:
    model: model_name
    messages: an array of message objects that represent the conversation so far
        message: { role: "role_name", content: "message_content" }
*/

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
        return new Promise((resolve, reject) => {
            this.axios.post(API_URL, formData, this.getAxiosConfig()).then(resp => {
                for(let i in resp.data["choices"]) {
                    const choice = resp.data["choices"][i];
                    if (choice["finish_reason"] == "stop") { resolve(choice["message"]); }
                }
                reject("No suitable respones found.");
            });
        })
    }
}

module.exports = ChatGPT;