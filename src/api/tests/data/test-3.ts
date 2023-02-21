import { faker } from '@faker-js/faker';
import {
  AnswerContentType,
  AnswersView,
  AnswerType,
  IQuestion
} from 'server/api/questions/question.interfaces';
import { IInterpretation, ITest, ITestResult, TestPurpose, TestType } from '../tests.interfaces';
import { IAnswer } from '../../questions/question.interfaces';

const test_3_answers_various = [
  'Нет, совершенно не согласен',
  'Иногда это так',
  'Обычно (часто)',
  'Да, совершенно согласен (всегда)'
];

const test_3_questions_various = [
  'Я люблю слушать громкую (энергичную) музыку.',
  'Выберите наиболее приятное изображение.',
  'Мне нравятся ситуации с некоторой долей неопределенности, когда я не знаю, что будет со мной дальше.',
  'Я люблю бросать вызов судьбе.',
  'Судьба более несправедлива ко мне, чем к другим.',
  'У меня столько энергии, что я не могу даже два часа просидеть без дела.',
  'Я менее счастлив(а), чем другие.',
  'Меня раздражают осторожные (медли тельные или излишне неуверенные) люди.',
  'В настоящее время невозможно верить во что-либо хорошее.',
  'Мне нравится соревноваться.'
];

const test_3_answers_text: IAnswer[] = test_3_answers_various.map((value, key) => ({
  number: key + 1,
  value,
  contentType: AnswerContentType.Text
}));

const test_3_answers_image: IAnswer[] = [...new Array(4)].map((_, key) => ({
  number: key + 1,
  value: `${faker.image.abstract()}?random=${key}`,
  contentType: AnswerContentType.Image
}));

const test_3_questions: IQuestion[] = test_3_questions_various.map((value, key) => ({
  number: key + 1,
  text: value,
  answersType: AnswerType.Typed,
  answersView: AnswersView.Radiobutton,
  answersArray: key === 1 ? test_3_answers_image : test_3_answers_text
}));

const test_3_interpretation: IInterpretation[] = [];

export const test_3: ITest = {
  name: 'Шкала оптимизма и активности (Н. Водопьянова, М. Штейн)',
  sysname: 'sysname_3',
  version: '1',
  versionView: '1',
  description: 'Выявление личностных факторов',
  instruction: `
  Перед вами список утверждений. Пожалуйста, прочтите внимательно каждое из них и оцените степень вашего согласия с каждым из них. 
  Для этого используйте приведенные на бланке варианты ответов. Зачеркните цифру, соответствующую вашей оценке.`,
  questionsCounts: 10,
  type: TestType.Test,
  purpose: TestPurpose.User,
  author: faker.name.fullName(),
  executeTime: '4 минуты',
  pictureLink: faker.image.abstract() + `?random=${2}`,
  questions: test_3_questions,
  interpretations: test_3_interpretation
};

export const test_3_result: ITestResult = {
  id: '3',
  sysname: 'sysname_3',
  versionView: '1',
  userId: faker.datatype.uuid(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  executeTime: `${faker.datatype.number(3)} минуты`,
  score: [
    {
      title: 'Активность',
      value: '20'
    },
    {
      title: 'Оптимизм',
      value: '16'
    }
  ],
  object: [
    {
      title: 'Оптимизм',
      value: `
        Оптимизм в данной методике понимается как предрасположенность человека верить в свои силы и успех, иметь преимущественно положительные ожидания от жизни и других людей. «Оптимисты», как правило, экстравертированны, доброжелательны и открыты для общения. Для противоположной категории людей, пессимистов, свойственны сомнения в своих силах и доброжелательности других людей, ожидание неудачи, стремление избегать широких контактов, замкнутость на своем внутреннем мире (интровертированность).
      `
    },
    {
      title: 'Активность',
      value: `
        Под активностью в данном контексте понимается энергичность, жизнерадостность, беспечность, безмятежность и склонность к риску. Пассивность проявляется в тревожности, боязливости, неуверенности в себе и нежелании что-либо делать.
      `
    }
  ]
};
