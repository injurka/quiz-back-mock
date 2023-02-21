import config from './config';
import Server from './server';
import validateEnv from './utils/validate-env';

(async () => {
  validateEnv();

  const app = new Server({ ...config });

  await app.listen();
})();
