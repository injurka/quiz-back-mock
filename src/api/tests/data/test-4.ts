import { faker } from '@faker-js/faker';
import {
  AnswerContentType,
  AnswersView,
  AnswerType,
  IQuestion
} from 'server/api/questions/question.interfaces';
import { IInterpretation, ITest, ITestResult, TestPurpose, TestType } from '../tests.interfaces';
import { IAnswer } from '../../questions/question.interfaces';

const test_4_answers_various = ['Наверное для меня', 'Иногда верно', 'Верно для меня'];

const test_4_questions_various = [
  'У меня возникает ощущение, как будто мне безумно не хватает вре мени',
  'Я предпочитаю рассматривать все альтернативы',
  'Я предпочитаю оставлять принятие решений другим людям',
  'Я пытаюсь найти недостатки у всех альтернатив',
  'Я трачу много времени на мелкие дела, прежде чем приступаю к принятию основного решения',
  'Я продумываю лучший способ исполнения решения',
  'Даже после принятия решения я откладываю на потом его исполнение',
  'При принятии решений я предпочитаю собирать большое количество информации',
  'Я избегаю принимать решения',
  'Когда мне нужно принять решение, я жду долгое время перед тем, как начать о нем думать',
  'Мне не нравится брать на себя ответственность за принятие решений',
  'Я стараюсь иметь четкое представление о своих целях, перед тем как сделать выбор',
  'Возможность того, что какая-то мелочь пойдет «не по плану», вы нуждает меня резко изменить решение',
  'Если решение может быть принято мной или другим человеком, я дам другому человеку это сделать',
  'Когда я сталкиваюсь с трудной проблемой, я обычно пессимистичен относительно возможности найти хорошее решение',
  'Я тщательно все обдумываю перед тем, как сделать выбор',
  'Я не принимаю решения, пока в этом нет острой необходимости',
  'Я отсрочиваю принятие решений до последнего момента',
  'Я предпочитаю, чтобы решения принимались теми, кто в большей степени информирован, чем я',
  'После того, как я принял решение, я трачу много времени, убеждая себя, что оно было правильным',
  'Я откладываю принятие решений',
  'Я не могу мыслить трезво, если мне нужно принять решение в спешке'
];

const test_4_answers_text: IAnswer[] = test_4_answers_various.map((value, key) => ({
  number: key + 1,
  value,
  contentType: AnswerContentType.Text
}));

const test_4_answers_image: IAnswer[] = [...new Array(4)].map((_, key) => ({
  number: key + 1,
  value: `${faker.image.abstract()}?random=${key}`,
  contentType: AnswerContentType.Image
}));

const test_4_questions: IQuestion[] = test_4_questions_various.map((value, key) => ({
  number: key + 1,
  text: value,
  answersType: AnswerType.Typed,
  answersView: AnswersView.Radiobutton,
  answersArray: key === 1 ? test_4_answers_image : test_4_answers_text
}));

const test_4_interpretation: IInterpretation[] = [];

export const test_4: ITest = {
  name: 'Мельбурнский опросник принятия решений (МОПР, MDMQ)',
  sysname: 'sysname_4',
  version: '1',
  versionView: '1',
  description: '',
  instruction: `
    Пожалуйста, укажите, как именно Вы принимаете решения, – для каждого вопроса выберите  (обведите) ответ, наиболее соответствующий Вашему обычному стилю принятия решений
  `,
  questionsCounts: 22,
  type: TestType.Test,
  purpose: TestPurpose.User,
  author: faker.name.fullName(),
  executeTime: '3 минуты',
  pictureLink: faker.image.abstract() + `?random=${2}`,
  questions: test_4_questions,
  interpretations: test_4_interpretation
};

export const test_4_result: ITestResult = {
  id: '4',
  sysname: 'sysname_4',
  versionView: '1',
  userId: faker.datatype.uuid(),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  executeTime: `${faker.datatype.number(3)} минуты`,
  score: [
    {
      title: 'Бдительность',
      value: '4'
    },
    {
      title: 'Избегание',
      value: '5'
    },
    {
      title: 'Прокрастинация',
      value: '6'
    },
    {
      title: 'Сверхбдительность',
      value: '8'
    }
  ],
  object: [
    {
      title: 'Бдительность',
      value: `
        Основная стилевая характеристика человека, как ЛПР (личности, принимающей решение),  связана с когнитивной сложностью, потребностью в познании и толерантностью к неопределенности.  Уточнение целей и задач решения, рассмотрение альтернатив, связанное с поиском информации,  ассимиляцией ее «без предрассудков» и оценки перед выбором.
      `
    },
    {
      title: 'Прокрастинация',
      value: `
        Откладывание решения.
      `
    },
    {
      title: 'Избегание',
      value: `
        Избегание самостоятельного принятия решения, перекладывание ответственности  и рационализация сомнительных альтернатив.
      `
    },
    {
      title: 'Сверхбдительность',
      value: `
        Неоправданное «метание» между разными альтернативами, импульсивное принятие  решения, обещающее избавление от ситуации; в экстремальных формах – «паника» в выборе между альтернативами.
      `
    }
  ]
};
