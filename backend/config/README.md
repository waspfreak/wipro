```javascript
import ConfigManager from 'configmanager'
const manager = new ConfigManager()
const config = manager.getConfigurationSecret('awsmobile_config')
Amplify.configure(config);
```

For multiple env we could store then pass the env name in the name of the secret like
```javascript
const config = manager.getSecret(`awsmobile_config_${env}`)
```