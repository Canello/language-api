const path = require("path");
const { runPythonScript } = require("./run-python-script");

const speechToText = async (filename) => {
    const pythonScriptPath = path.resolve(
        __dirname,
        "..",
        "..",
        "python",
        "speech-to-text.py"
    );
    const args = [filename];
    return await runPythonScript(pythonScriptPath, args);
};

module.exports = { speechToText };
