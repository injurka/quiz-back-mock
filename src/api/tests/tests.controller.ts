import Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import { ITestListProps, ITestResultPayload } from './tests.interfaces';

import { TestsService } from './tests.service';

export class TestsController {
  private service = new TestsService();

  public async submitTestResult(req: Hapi.Request, res: Hapi.ResponseToolkit) {
    try {
      await this.service.submitTestResult(req.payload as ITestResultPayload);
      return res.response();
    } catch (_) {
      return Boom.notFound();
    }
  }

  public async getBySysname(req: Hapi.Request, res: Hapi.ResponseToolkit) {
    try {
      const item = await this.service.getBySysname(`${req.params.sysname}`);

      if (!item) throw new Error('Test not found');

      return res.response(item);
    } catch (_) {
      return Boom.notFound();
    }
  }

  public async getResults(req: Hapi.Request, res: Hapi.ResponseToolkit) {
    try {
      const item = await this.service.getResultsByObjectId(`${req.params.objectId}`);

      if (!item) throw new Error('Test result not found');

      return res.response(item);
    } catch (_) {
      return Boom.notFound();
    }
  }

  public async getListBySysnames(req: Hapi.Request, res: Hapi.ResponseToolkit) {
    try {
      const payload = req.payload as ITestListProps;
      const result = await this.service.getListBySysnames(payload.sysnames);
      return res.response(result);
    } catch (_) {
      return Boom.badRequest();
    }
  }

  public async getCategories(req: Hapi.Request, res: Hapi.ResponseToolkit) {
    try {
      const result = await this.service.getCategories();
      return res.response(result);
    } catch (_) {
      return Boom.badRequest();
    }
  }

  public async getPassed(req: Hapi.Request, res: Hapi.ResponseToolkit) {
    try {
      const result = await this.service.getPassed();
      return res.response(result);
    } catch (_) {
      return Boom.badRequest();
    }
  }
}
