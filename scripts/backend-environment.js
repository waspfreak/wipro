const argv = require('yargs').argv
const amplifyutils = require('../utils/amplifyutils');
const ioutils = require('../utils/ioutils');

async function main() {
  if (argv.switch) {
    await switchEnvironment(argv.envName);
  } else if (argv.delete) {
    await deleteEnvironment(argv.envName);
  } else if (argv.list) {
    await printEnvironments();
  }
}

main().catch(err => {
  console.error(err);
});

async function deleteEnvironment(environment) {
  const protectedEnvironments = ["develop", "production", "qa"];

  if (!environment || !environment.length > 0) {
    throw new Error("Please specify the environment using --envName ENVIRONMENT");
  }

  if (protectedEnvironments.includes(environment)) {
    throw new Error(`Please don't delete any protected environment. You tried to delete ${environment}, and the protected environments are ${protectedEnvironments}`)
  }

  const currentEnvironments = await amplifyutils.listEnvironments();

  if (environment === currentEnvironments.selected) {
    const switchToDevelop = await userConfirmation('It looks like you are about to delete your current environment. Do you want to switch to the develop environment?', true);

    if (switchToDevelop) {
      await switchEnvironment("develop");
    }
    else {
      throw new Error("You tried to delete your current environment.");
    }
  }

  await amplifyutils.deleteEnvironment(environment);
}

async function switchEnvironment(environment) {
  if (!environment) {
    throw new Error('Please specify the environment to switch to using --envName');
  }

  const currentEnvironments = await amplifyutils.listEnvironments();
  if (environment === currentEnvironments.selected) {
    throw new Error(`Tried to switch to the ${environment} environment, but you are already on it`);
  }

  if (!currentEnvironments.otherEnvironments.includes(environment)) {
    throw new Error(`The environment entered is not currently created in the backend. Please use list-environments to see available ones.`);
  }

  await amplifyutils.switchEnvironment(environment)
}

async function printEnvironments() {
  const environments = await amplifyutils.listEnvironments();
  console.log("Current environment:", environments.selected)
  console.log("Other environments:", environments.otherEnvironments);
}

async function userConfirmation(question, defaultValue) {
  if (argv.yes) {
    return true;
  }

  return await ioutils.readBoolean(question, defaultValue);
}
