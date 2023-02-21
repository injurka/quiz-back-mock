import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

export default {
  host: process.env.HOST || 'localhost',
  apiService: process.env.API_SERVICE || '',
  port: +(process.env.PORT || 8000),
  useNocks: process.env.USE_NOCKS === 'true',
  useMock: process.env.USE_MOCK === 'true'
};
