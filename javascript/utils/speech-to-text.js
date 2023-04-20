const path = require("path");
const { runPythonScript } = require("./run-python-script");

const speechToText = async () => {
    const pythonScriptPath = path.resolve(
        __dirname,
        "..",
        "..",
        "python",
        "speech-to-text.py"
    );
    const args = [];
    const envActivatePath = path.resolve(
        __dirname,
        "..",
        "..",
        "python",
        "language-api",
        process.env.ENV_ACTIVATION_FOLDER,
        "activate"
    );
    return await runPythonScript(pythonScriptPath, args, envActivatePath);
};

module.exports = { speechToText };
