const { spawn } = require("child_process");
const path = require("path");

// Main
const runPythonScript = (pythonScriptPath, args) => {
    return new Promise((resolve, reject) => {
        const childProcess = startChildProcess(pythonScriptPath);
        sendArgs(childProcess, args);
        listenToOutput(childProcess, resolve, reject);
    });
};

// Functions
function startChildProcess(pythonScriptPath) {
    const envActivatePath = path.resolve(
        __dirname,
        "..",
        "..",
        "python",
        "language-api",
        process.env.OS_TYPE === "windows" ? "scripts" : "bin",
        "activate"
    );
    let activationCommand = envActivatePath ? envActivatePath + " && " : "";
    let childProcess;

    if (process.env.OS_TYPE === "windows") {
        childProcess = spawn("cmd.exe", [
            "/c",
            `${activationCommand}python ${pythonScriptPath}`,
        ]);
    } else if (process.env.OS_TYPE === "linux") {
        activationCommand = activationCommand
            ? "source " + activationCommand
            : "";
        childProcess = spawn("bash", [
            "-c",
            `${activationCommand}python ${pythonScriptPath}`,
        ]);
    }

    return childProcess;
}

function sendArgs(childProcess, args) {
    let vars = "";
    for (let arg of args) {
        vars += arg + "\n";
    }
    childProcess.stdin.write(vars);
    childProcess.stdin.end();
}

function listenToOutput(childProcess, resolve, reject) {
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
}

module.exports = { runPythonScript };
