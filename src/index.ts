import * as dotenv from 'dotenv';
import path from 'path';

import config from './config';
import Server from './server';
import validateEnv from './utils/validate-env';

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

(async () => {
  validateEnv();

  const app = new Server({ host: config.host, port: config.port, routes: { cors: true } });

  await app.setUpPlugins();
  await app.listen();
})();
