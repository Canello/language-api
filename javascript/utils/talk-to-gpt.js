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
    return await runPythonScript(pythonScriptPath, args);
};

module.exports = { talkToGPT };
