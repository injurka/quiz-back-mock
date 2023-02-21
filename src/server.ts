/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import * as Hapi from '@hapi/hapi';
import * as Tests from 'server/api/tests';

import config from 'server/config';
import InertPlugin from 'server/plugins/inert';
import VisionPlugin from 'server/plugins/vision';

class Server {
  private server: Hapi.Server;

  constructor(options: Hapi.ServerOptions) {
    this.server = new Hapi.Server({ ...options, routes: { cors: true } });

    this.initializeControllers();
    this.setUpNodeExceptions();
  }

  public async listen() {
    try {
      this.server.start();
      console.log('---------------------------------------');
      console.log(`✨ App listening on the port ${config.port}`);
      console.log(`🚀 ${this.server.info.uri}`);
      this.server.table().forEach((route) => console.log(`${route.method}\t${route.path}`));
      console.log('---------------------------------------');
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  private initializeControllers() {
    Tests.init(this.server, '/api');
  }

  public getServer(): Hapi.Server {
    return this.server;
  }

  public async setUpPlugins(): Promise<void> {
    try {
      if (process.env.NODE_ENV === 'staging') {
        await InertPlugin(this.server);
        await VisionPlugin(this.server);
      }
    } catch (err) {
      console.error(err);
      throw new Error('Unable to register plugins');
    }
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
