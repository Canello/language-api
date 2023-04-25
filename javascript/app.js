const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");

const { uploadAudio } = require("./middlewares/upload-audio");
const { transcriptAudio } = require("./controllers/transcription");
const { chat } = require("./controllers/chat");
const { errorHandler } = require("./middlewares/error-handler");
const { testEndpoint } = require("./controllers/test-endpoint");

// app.js should be initialized from within the javascript folder.
// If not, the file paths will be wrong.

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Fine!"));
app.get("/test", testEndpoint);
app.post("/transcription", uploadAudio, transcriptAudio);
app.post("/chat", chat);

app.use(errorHandler);

module.exports = { app };
