import detox from 'detox';
import adapter from 'detox/runners/jest/adapter';
const config = require('../../package.json').detox;

// Set the default timeout
jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
  await detox.init(config, { launchApp: false });
  await device.launchApp({
    newInstance: false,
    permissions: {
      notifications: 'YES',
      calendar: 'YES',
      camera: 'YES',
      contacts: 'YES',
      health: 'YES',
      homekit: 'YES',
      location: 'always',
      medialibrary: 'YES',
      microphone: 'YES',
      motion: 'YES',
      photos: 'YES',
      reminders: 'YES',
      siri: 'YES'
    }
  });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
