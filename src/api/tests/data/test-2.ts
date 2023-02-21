import { faker } from '@faker-js/faker';
import {
  AnswerContentType,
  AnswersView,
  AnswerType,
  IQuestion,
  QuestionContentType
} from 'server/api/questions/question.interfaces';
import { IInterpretation, ITest, ITestResult, TestPurpose, TestType } from '../tests.interfaces';
import { IAnswer } from '../../questions/question.interfaces';

const test_2_answers_various = [
  'Говорю себе: в данный момент есть что-то важнее, чем трудности',
  'Говорю себе: это судьба, нужно с этим смириться',
  'Это несущественные трудности, не все так плохо, в основном все хорошо',
  'Я не теряю самообладания и контроля над собой в тяжелые минуты и стараюсь никому не показывать своего состояния'
];

const test_2_questions_various = [
  'Посмотрите видео и выберете чувства, которые вы испытали в ходе просмотра'
];

const test_2_answers: IAnswer[] = test_2_answers_various.map((value, key) => ({
  number: key + 1,
  value,
  contentType: AnswerContentType.Text
}));

const test_2_questions: IQuestion[] = test_2_questions_various.map((value, key) => ({
  number: key + 1,
  text: value,
  answersType: AnswerType.Typed,
  answersView: AnswersView.Radiobutton,
  answersArray: test_2_answers,
  contentType: QuestionContentType.Video,
  contentLink: 'ORkIoaM7ICQ'
}));

const test_2_interpretation: IInterpretation[] = [];

export const test_2: ITest = {
  name: 'Копинг-стратегии Хайме',
  sysname: 'sysname_2',
  version: '1',
  versionView: '1',
  description: 'Оценка тревоги',
  instruction: `\tВам будет предложен ряд утверждений, касающихся особенностей Вашего поведения. Постарайтесь вспомнить, каким образом Вы чаще всего разрешаете трудные и стрессовые ситуации и ситуации высокого эмоционального напряжения. Обведите кружком, пожалуйста, тот номер, который Вам подходит.
\tВ каждом разделе утверждений необходимо выбрать только один вариант, при помощи которого Вы разрешаете свои трудности. Отвечайте, пожалуйста, в соответствии с тем, как Вы справляетесь с трудными ситуациями на протяжении последнего времени. Не раздумывайте долго - важна Ваша первая реакция. Будьте внимательны!`,
  questionsCounts: 1,
  type: TestType.Test,
  purpose: TestPurpose.User,
  author: faker.name.fullName(),
  executeTime: '3 минуты',
  pictureLink: faker.image.abstract() + `?random=${2}`,
  questions: test_2_questions,
  interpretations: test_2_interpretation
};

export const test_2_result: ITestResult = {
  id: '2',
  sysname: 'sysname_2',
  versionView: '1',
  userId: faker.datatype.uuid(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  executeTime: `${faker.datatype.number(2)} минуты`,
  score: [
    {
      title: 'Cмирение',
      value: `${faker.datatype.number({ min: 0, max: 5, precision: 0.1 })}`
    },
    {
      title: 'Растерянность',
      value: `${faker.datatype.number({ min: 0, max: 5, precision: 0.1 })}`
    },
    {
      title: 'Диссимуляция',
      value: `${faker.datatype.number({ min: 0, max: 5, precision: 0.1 })}`
    },
    {
      title: 'Игнорирование',
      value: `${faker.datatype.number({ min: 0, max: 5, precision: 0.1 })}`
    }
  ],
  object: [
    {
      title: 'Среди когнитивных копинг-стратегий к ним относятся:',
      value: `* «смирение» , * «растерянность» , * «диссимуляция», * «игнорирование» – 
      пассивные формы поведения с отказом от пре­одоления трудностей из-за неверия в свои силы и интеллектуальные ресурсы, 
      с умышленной недооценкой неприятностей.`
    }
  ]
};
