import {
  ITest,
  ITestResultPayload,
  ITestCategory,
  ITestResult,
  IPassedTest
} from './tests.interfaces';
import {
  testCategoriesMocks,
  testsMock,
  testsResultsMock,
  generateTestResultMock,
  passedTestsMock,
  testsHardcode,
  passedTestsHardcode,
  testCategoriesHardcode,
  testsResultsHardcode,
  testsSubmitedResultsHardcode
} from './tests.model';
import config from 'server/config';

export class TestsService {
  private repositoryTests = config.useMock ? testsMock : testsHardcode;
  private repositoryTestsResults = config.useMock ? testsResultsMock : testsSubmitedResultsHardcode;
  private repositoryCategories = config.useMock ? testCategoriesMocks : testCategoriesHardcode;
  private repositoryPassedTests = config.useMock ? passedTestsMock : passedTestsHardcode;

  public async submitTestResult(payload: ITestResultPayload) {
    const result = config.useMock
      ? generateTestResultMock(payload.sysname)
      : (testsResultsHardcode.find((f) => f.sysname === payload.sysname) as ITestResult);

    this.repositoryTestsResults.push(result);
  }

  public async getBySysname(sysname: string) {
    const data = await new Promise<ITest>((r) =>
      r(this.repositoryTests.find((f) => f.sysname === sysname) as ITest)
    );
    return data;
  }

  public async getResultsByObjectId(objectId: string) {
    const data = await new Promise<ITestResult>((r) =>
      r(this.repositoryTestsResults.find((f) => f.id === objectId) as ITestResult)
    );
    return data;
  }

  public async getListBySysnames(sysnames: string[]) {
    const data = await new Promise<ITest[]>((r) =>
      r(
        !!sysnames.length
          ? (this.repositoryTests.filter((f) => sysnames.includes(f.sysname)) as ITest[])
          : this.repositoryTests
      )
    );
    return data;
  }

  public async getCategories() {
    const data = await new Promise<ITestCategory[]>((r) =>
      r(this.repositoryCategories as ITestCategory[])
    );
    return data;
  }

  public async getPassed() {
    const data = await new Promise<IPassedTest[]>((r) => r(this.repositoryPassedTests));
    return data;
  }
}
