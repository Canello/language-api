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

app.post("/transcription", upload.single("audio"), async (req, res) => {
    try {
        const transcription = await speechToText();
        console.log("YOU:", transcription);

        res.send({
            data: { transcription },
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/chat", async (req, res) => {
    try {
        const { query } = req.body;
        messages.push({ role: "user", content: query });

        const gptResponse = await talkToGPT(messages);
        messages.push({ role: "assistant", content: gptResponse });
        console.log("GPT:", gptResponse);

        res.send({
            data: { reply: gptResponse },
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log("listening on 3001");
});
