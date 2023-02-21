import Server from 'server/server';

describe('Testing', () => {
  let server: Server;

  beforeAll(() => {
    server = new Server({ host: 'localhost', port: 8000 });
    return server.listen();
  });

  afterAll(() => server.getServer().stop());

  test('Should return', async () => {
    const options = {
      method: 'GET',
      url: '/v1/quiz/1'
    };
    const response = await server.getServer().inject(options);

    expect(response.statusCode).toBe(200);
  });
});
