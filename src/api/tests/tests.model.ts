import { faker } from '@faker-js/faker';
import { generateQuestionsMock } from 'server/api/questions/question.model';
import {
  test_1,
  test_1_result,
  test_2,
  test_2_result,
  test_3,
  test_3_result,
  test_4,
  test_4_result,
  test_categories
} from './data';
import {
  IPassedTest,
  ITest,
  ITestCategory,
  ITestResult,
  TestPurpose,
  TestType
} from './tests.interfaces';

//* ---- MOCK Test --------------------------------------------------------- *//
const AMOUNT_TESTS = faker.datatype.number({ min: 10, max: 15 });
const AMOUNT_TESTS_PER_CATEGORY = 3;
const AMOUNT_CATEGORIES = Math.floor(AMOUNT_TESTS / AMOUNT_TESTS_PER_CATEGORY);

const IDS_PASSED_TESTS: string[] = [
  ...new Set([
    ...faker.helpers.arrayElements(
      Array(AMOUNT_TESTS).map((_, key) => `${key}`),
      AMOUNT_TESTS / 2
    ),
    '1'
  ])
];

export const testCategoriesMocks: ITestCategory[] = [...Array(AMOUNT_CATEGORIES)].map((_, id) => {
  return {
    id: `${id}`,
    name: faker.lorem.words(2),
    testSysnames: [...Array(AMOUNT_TESTS_PER_CATEGORY)].map(
      (_, tid) => `${id * AMOUNT_TESTS_PER_CATEGORY + tid}`
    )
  };
});

export const testsMock: ITest[] = [...Array(AMOUNT_TESTS)].map((_, id) => {
  const questions = generateQuestionsMock();

  return {
    sysname: `${id}`,
    name: faker.lorem.words(4),
    version: faker.system.semver(),
    versionView: faker.system.semver(),
    description: faker.lorem.words(10),
    questionsCounts: questions.length,
    purpose: faker.helpers.arrayElement([TestPurpose.Internal, TestPurpose.User]),
    type: faker.helpers.arrayElement([TestType.Quiz, TestType.Test]),
    author: faker.name.fullName(),
    executeTime: `${faker.datatype.number(30)} минут`,
    pictureLink: faker.image.abstract() + `?random=${id}`,
    interpretations: [...Array(faker.datatype.number({ min: 1, max: 3 }))].map(() => ({
      sysname: faker.lorem.words(1),
      text: faker.lorem.paragraph()
    })),
    questions
  };
});

export const passedTestsMock: IPassedTest[] = [...IDS_PASSED_TESTS].map((_, id) => {
  return {
    id: `${id}`,
    sysname: `${id}`,
    testVersion: testsMock[id].version,
    questionsCount: testsMock[id].questions.length,
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    executeTime: testsMock[id].executeTime,
    name: testsMock[id].name,
    description: testsMock[id].description,
    dateStart: faker.date.past(),
    previewPictureLink: testsMock[id].pictureLink
  };
});

export const generateTestResultMock = (id: string | number): ITestResult => ({
  id: `${id}`,
  sysname: `${id}`,
  versionView: faker.system.semver(),
  userId: faker.datatype.uuid(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  executeTime: `${faker.datatype.number(30)} минут`,
  score: [...Array(faker.datatype.number({ min: 1, max: 3 }))].map(() => ({
    title: faker.lorem.words(1),
    value: `${faker.datatype.number({ min: 0, max: 5, precision: 0.1 })}`
  })),
  object: [...Array(faker.datatype.number({ min: 1, max: 3 }))].map(() => ({
    title: faker.lorem.words(1),
    value: faker.lorem.paragraph()
  }))
});

export const testsResultsMock: ITestResult[] = [...IDS_PASSED_TESTS].map((_, id) =>
  generateTestResultMock(id)
);

//* ---- HARDCODE Test --------------------------------------------------------- *//

export const testCategoriesHardcode: ITestCategory[] = test_categories;
export const testsHardcode: ITest[] = [test_1, test_2, test_3, test_4];
export const passedTestsHardcode: IPassedTest[] = [];
export const testsSubmitedResultsHardcode: ITestResult[] = [];
export const testsResultsHardcode: ITestResult[] = [
  test_1_result,
  test_2_result,
  test_3_result,
  test_4_result
];
