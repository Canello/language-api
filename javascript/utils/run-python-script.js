const { spawn } = require("child_process");

// Main
const runPythonScript = (pythonScriptPath, args, envActivatePath) => {
    return new Promise((resolve, reject) => {
        const childProcess = startChildProcess(
            pythonScriptPath,
            envActivatePath
        );
        sendArgs(childProcess, args);
        listenToOutput(childProcess, resolve, reject);
    });
};

// Functions
function startChildProcess(pythonScriptPath, envActivatePath) {
    let childProcess;
    if (process.env.OS_TYPE === "windows") {
        const activationCommand = envActivatePath
            ? envActivatePath + " && "
            : "";
        childProcess = spawn("cmd.exe", [
            "/c",
            `${activationCommand}python ${pythonScriptPath}`,
        ]);
    } else if (process.env.OS_TYPE === "linux") {
        const activationCommand = envActivatePath
            ? "source " + envActivatePath + " && "
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
