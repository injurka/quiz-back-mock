import { Request, Response } from 'express';
import { ITestListProps, ITestResultPayload } from './tests.interfaces';

import { TestsService } from './tests.service';

export class TestsController {
  private service = new TestsService();

  submitTestResult = async (req: Request, res: Response) => {
    const payload = req.body as ITestResultPayload;

    try {
      await this.service.submitTestResult(payload);
      return res.status(200).send();
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  getBySysname = async (req: Request, res: Response) => {
    try {
      const result = await this.service.getBySysname(`${req.params.sysname}`);
      if (!result) throw new Error('Test not found');
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  getResults = async (req: Request, res: Response) => {
    try {
      const result = await this.service.getResultsByObjectId(`${req.params.objectId}`);
      if (!result) throw new Error('Test result not found');
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  getListBySysnames = async (req: Request, res: Response) => {
    try {
      const payload = req.body as ITestListProps;

      const result = await this.service.getListBySysnames(payload?.sysnames);
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  getCategories = async (req: Request, res: Response) => {
    try {
      const result = await this.service.getCategories();
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).send(e);
    }
  };

  getPassed = async (req: Request, res: Response) => {
    try {
      const result = await this.service.getPassed();
      return res.status(200).send(result);
    } catch (e) {
      console.log('>3');
      return res.status(500).send(e);
    }
  };
}
