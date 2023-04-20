const path = require("path");
const { runPythonScript } = require("./run-python-script");

const talkToGPT = async (messages) => {
    const pythonScriptPath = path.resolve(
        __dirname,
        "..",
        "..",
        "python",
        "talk-to-gpt.py"
    );
    const args = [JSON.stringify(messages)];
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

module.exports = { talkToGPT };
