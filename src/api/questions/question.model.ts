import { faker } from '@faker-js/faker';
import {
  AnswerContentType,
  AnswersView,
  AnswerType,
  IQuestion,
  QuestionContentType
} from './question.interfaces';

//* ---- MOCK Questions --------------------------------------------------------- *//

export const generateQuestionsMock = (): IQuestion[] => {
  const AMOUNT_QUESTIONS = faker.datatype.number({ min: 5, max: 10 });

  return [...Array(AMOUNT_QUESTIONS)].map((__, numberQuestion) => {
    const AMOUNT_ANSWERS = faker.datatype.number({ min: 2, max: 4 });
    const answerContentType = faker.helpers.arrayElement([
      AnswerContentType.Text,
      AnswerContentType.Image
    ]);

    return {
      number: numberQuestion + 1,
      text: faker.lorem.paragraph(),
      answersType: faker.helpers.arrayElement([AnswerType.Typed, AnswerType.Unique]),
      answersView: faker.helpers.arrayElement([AnswersView.Radiobutton, AnswersView.Select]),
      contentType: faker.helpers.arrayElement([
        QuestionContentType.Image,
        QuestionContentType.Video
      ]),
      contentLink: faker.internet.url(),
      answersArray: [...Array(AMOUNT_ANSWERS)].map((_, numberAnswer) => ({
        number: numberAnswer + 1,
        contentType: answerContentType,
        value:
          answerContentType === AnswerContentType.Image
            ? `${faker.image.abstract()}?random=${numberAnswer}`
            : faker.lorem.word()
      }))
    };
  });
};

export const questionsMock: IQuestion[] = generateQuestionsMock();
