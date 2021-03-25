const util = require('util');
const defaultReadLine = require('readline');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);

async function readLine(question) {
  return new Promise(function (resolve, reject) {
    const rl = defaultReadLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question + ' ', function (input) {
      resolve(input);
      rl.close();
    });
  });
}


async function killProcessWithOpenPort(port) {
  //console.log("Killing process with open port", port);
  await exec(`lsof -ti:${port} | xargs kill -9`);
}

async function readBoolean(question, defaultValue) {
  var result = null;
  if (defaultValue) {
    result = await readLine(`${question} (Y/n):`);
  } else {
    result = await readLine(`${question} (y/N):`);
  }

  if (result === '') {
    return defaultValue;
  }

  if (['y', 'yes'].includes(result.toLowerCase())) {
    return true;
  } else if (['n', 'no'].includes(result.toLowerCase())) {
    return false;
  } else {
    console.log('Please enter either yes, y, n or no.');
    return await readBoolean(question, defaultValue);
  }
}

// Beware!
async function deleteFolderRecursively(path) {
  try {
    await exec(`rm -r ${path}`);
  } catch (err) { }
}

function execWithLogs(command) {
  return new Promise((resolve, reject) => {
    const process = childProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });

    process.stdout.on('data', console.log);
    process.stderr.on('data', console.error);
    process.stdin.write('Y\n');
  });
}

module.exports = {
  exec: exec,
  execWithLogs: execWithLogs,
  readLine: readLine,
  readBoolean: readBoolean,
  deleteFolderRecursively: deleteFolderRecursively,
  killProcessWithOpenPort: killProcessWithOpenPort
};
