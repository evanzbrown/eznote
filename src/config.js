module.exports = {
    PROJECT_NAME: "EZnote",
    MODELS: { "chatGPT": "gpt-4", "whisper": "whisper-1" },
    BASE_PROMPT: [
        {role: "system", content: "You are a virtual secretary whose job it is to turn a transcribed audio recording into easy to read notes."},
        {role: "user", content: "I am going to send you transcriptions, I want you to respond ONLY with a markdown document containing notes of key details, sort the notes by subcategory and prefix the document with a title for the general topic. Do NOT use information not provided by the user. Do not include an additional \"Note\" category."}
    ]
}