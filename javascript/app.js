const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const { speechToText } = require("./utils/speech-to-text");
const { talkToGPT } = require("./utils/talk-to-gpt");
const { SYSTEM_PROMPT } = require("./utils/constants");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());

const messages = [{ role: "system", content: SYSTEM_PROMPT }];

app.post("/", upload.single("audio"), async (req, res) => {
    try {
        const transcription = await speechToText();
        messages.push({ role: "user", content: transcription });
        console.log("YOU:", transcription);

        const gptResponse = await talkToGPT(messages);
        messages.push({ role: "assistant", content: gptResponse });
        console.log("GPT:", gptResponse);

        // Send gptResponse to front-end, so it can use text-to-speech to talk to user
        res.send({ response: gptResponse });
        // 1 - Send, also, the messages array so the front-end can send it back in each request
        // 2 - Alternatively, store it in MongoDB or some DB optimized for frequent acess
    } catch (err) {
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log("listening on 3001");
});
