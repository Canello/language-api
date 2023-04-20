const express = require("express");
const multer = require("multer");
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { speechToText } = require("./utils/speech-to-text");
const { talkToGPT } = require("./utils/talk-to-gpt");
const { SYSTEM_PROMPT } = require("./utils/constants");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, "audio" + uuid.v4() + ".wav");
    },
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => res.send("Hey, this is ok!"));

app.post("/transcription", upload.single("audio"), async (req, res) => {
    try {
        const { filename } = req.file;
        const transcription = await speechToText(filename);
        console.log(
            "audio file exists?",
            "./uploads/" + filename,
            fs.existsSync("./uploads/" + filename)
        );
        fs.unlink(path.join(__dirname, "uploads", filename), (err) => {
            if (err) console.log(err);
        });

        res.send({
            data: { transcription },
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/chat", async (req, res) => {
    try {
        const { messages } = req.body;

        messages.unshift({ role: "system", content: SYSTEM_PROMPT });
        const gptResponse = await talkToGPT(messages);

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
