const ioutils = require('./ioutils');
const childProcess = require('child_process');

exports.listEnvironments = async function () {
  const { stdout, stderr } = await ioutils.exec("cd backend/api && amplify env list");

  if (stderr && stderr.toString().trim().length > 0) throw new Error(stderr.toString());

  const cleanOutput = stdout.toString().trim();
  const result = cleanOutput.split("\n").slice(2).map(value => {
    const trim = value.replace("\u001b[90m|\u001b[39m", "")
      .replace('\u001b[90m|\u001b[39m', '')
      .trim();

    const isCurrent = trim.startsWith("*");
    return {
      current: isCurrent,
      envName: isCurrent ? trim.slice(1) : trim
    }
  });

  const selected = result.filter(env => env.current)[0].envName;
  const otherEnvironments = result.filter(env => !env.current)
    .map(env => env.envName);
  return {
    selected: selected,
    otherEnvironments: otherEnvironments
  };
}

exports.deleteEnvironment = function (environment) {
  return new Promise((resolve, reject) => {
    const process = childProcess.exec(`cd backend/api && amplify env remove ${environment}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        console.log(`Deleted the environment ${environment} successfully`);
        resolve();
      }
    });

    process.stdin.on('data', console.log);
    process.stderr.on('data', console.error);

    // Confirm we want to delete.
    process.stdin.write('Y\n');
  });
}

exports.switchEnvironment = async function (environment) {
  await ioutils.exec(`cd backend/api && amplify env checkout ${environment} --yes`);
  console.log(`Switched to the environment ${environment} successfully`);
}