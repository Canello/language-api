const fs = require("fs");
const path = require("path");

const { speechToText } = require("../utils/speech-to-text");

const transcriptAudio = async (req, res) => {
    const { filename } = req.file;
    const transcription = await speechToText(filename);
    fs.unlink(path.join(__dirname, "..", "uploads", filename), (err) => {
        if (err) console.log(err);
    });

    res.send({
        data: { transcription },
    });
};

module.exports = { transcriptAudio };
