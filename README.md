# EZNote - plutohacks-2023
## Summary
EZNote is a web application that utilizes OpenAI's ChatGPT and Whisper APIs to convert recorded audio into formatted notes.
## Installing
To create a local installation of EZNote, you will need to rename example.env to .env and supply the necessary environment variables, most importantly the OpenAI API key. Then navigate to the root of the project in a command prompt and type `npm install` to install the required dependencies.
## Running
To run the EZNote, simply run `node src/index.js`, this will create a webserver at http://127.0.0.1:8080 which you can access in your browser.
## Using
EZNote requires that you upload an audio file in one of the following formats:
* FLAC
* MP3
* WAV
* OGG
* M4A

After selecting the file, simply click submit and your file will be processed, and then the note will be downloaded as a PDF.