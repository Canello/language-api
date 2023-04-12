const { spawn } = require("child_process");

const speechToText = async () => {
    return new Promise((resolve, reject) => {
        const activate =
            "C:/Users/gughi/documents/projects/language-js/language-api/python/language-api/scripts/activate";
        const pythonScript =
            "C:/Users/gughi/documents/projects/language-js/language-api/python/speech-to-text.py";
        const childProcess = spawn("cmd.exe", [
            "/c",
            `${activate} && python ${pythonScript}`,
        ]);

        let stdout = "";
        let stderr = "";

        childProcess.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        childProcess.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        childProcess.on("close", (code) => {
            if (code === 0) {
                resolve(stdout);
            } else {
                reject(stderr);
            }
        });
    });
};

module.exports = { speechToText };
