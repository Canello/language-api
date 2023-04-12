const { runPythonScript } = require("./run-python-script");

const speechToText = async () => {
    const pythonScriptPath =
        "C:/Users/gughi/documents/projects/language-js/language-api/python/speech-to-text.py";
    const args = [];
    const envActivatePath =
        "C:/Users/gughi/documents/projects/language-js/language-api/python/language-api/scripts/activate";
    return await runPythonScript(pythonScriptPath, args, envActivatePath);
};

module.exports = { speechToText };
