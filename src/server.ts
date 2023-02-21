/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import * as Tests from 'server/api/tests';

import os from 'os';
import cors from 'cors';
import express from 'express';
import config from 'server/config';
import { print } from 'server/utils/print-route';
import { allowCrossDomain } from './utils/allow-cross-domain';

interface IOptions {
  port: number;
}

class Server {
  private server;
  private options;

  constructor(options: IOptions) {
    const server = express();

    server.use(cors());
    server.use(allowCrossDomain);
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    this.server = server;
    this.options = options;

    this.initializeControllers();
    this.setUpNodeExceptions();
  }

  public async listen() {
    try {
      const { port } = this.options;

      await this.server.listen(port);

      console.log('---------------------------------------');
      console.log(`✨ App listening on the port ${config.port}`);
      console.log(`✨ ${os.hostname()}`);
      this.server._router.stack.forEach(print.bind(null, []));
      console.log('---------------------------------------');
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  private initializeControllers() {
    this.server.get('/health', (_, res) => res.status(200).send('200'));
    Tests.init(this.server, '/api');
  }

  private setUpNodeExceptions(): void {
    //* set up server exceptions
    process.on('uncaughtException', (error: Error) => {
      console.error('uncaughtException', error.stack);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  }
}

export default Server;
