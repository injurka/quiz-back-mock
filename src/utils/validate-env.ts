import { bool, cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    HOST: str(),
    API_SERVICE: str(),
    USE_MOCK: bool()
  });
}

export default validateEnv;
