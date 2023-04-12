const { runPythonScript } = require("./run-python-script");

const talkToGPT = async (messages) => {
    const pythonScriptPath =
        "C:/Users/gughi/documents/projects/language-js/language-api/python/talk-to-gpt.py";
    const args = [JSON.stringify(messages)];
    const envActivatePath =
        "C:/Users/gughi/documents/projects/language-js/language-api/python/language-api/scripts/activate";
    return await runPythonScript(pythonScriptPath, args, envActivatePath);
};

module.exports = { talkToGPT };
