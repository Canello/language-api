const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");

const { uploadAudio } = require("./middlewares/upload-audio");
const { transcriptAudio } = require("./controllers/transcription");
const { chat } = require("./controllers/chat");
const { errorHandler } = require("./middlewares/error-handler");

// app.js should be initialized from within the javascript folder.
// If not, the file paths will be wrong.

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Fine!"));
app.get("/test", (req, res) => res.send("Hey, this is ok!"));

app.post("/transcription", uploadAudio, transcriptAudio);
app.post("/chat", chat);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("listening on " + process.env.PORT);
});
