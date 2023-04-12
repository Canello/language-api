const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { speechToText } = require("./utils/speech-to-text");
const { talkToGPT } = require("./utils/talk-to-gpt");
require("dotenv").config();

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

app.post("/", upload.single("audio"), async (req, res, next) => {
    try {
        const transcription = await speechToText();
        await talkToGPT(transcription);
    } catch (err) {
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log("listening on 3001");
});
