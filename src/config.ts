export default {
  host: process.env.HOST || 'localhost',
  apiService: process.env.API_SERVICE || '',
  port: process.env.PORT || '8000',
  useNocks: process.env.USE_NOCKS === 'true',
  useMock: process.env.USE_MOCK === 'true'
};
