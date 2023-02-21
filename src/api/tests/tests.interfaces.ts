import { Request } from '@hapi/hapi';
import { IQuestion } from '../questions/question.interfaces';

export const enum TestType {
  Test,
  Quiz,
  etc
}

export const enum TestPurpose {
  User,
  Internal,
  etc
}

/*
 *  sysname           string        +     Именной идентификатор теста
 *  version           string        +     Версия теста
 *  versionView       string        +     Версия представления
 *  questionsCount    int           +     Количество вопросов
 *  type              int           +     Тип (тест, опросник и тд)
 *  purpose           int           -     Назначение (пользовательский тест, внутренний и тд)
 *  name              string        +     Название теста
 *  description       string        -     Описание теста
 *  instruction       string        +     Инструкция выполнения теста
 *  author            string        -     Автор теста
 *  executeTime       string        +     Время выполнения
 *  mainPictureLink   string        +     Ссылка на main картинку
 *  interpretations   array<object> +     Массив интерпретаций
 */

export interface IInterpretation {
  sysname: string;
  text: string;
}

export interface ITest {
  name: string;
  sysname: string;
  version: string;
  versionView: string;
  description?: string;
  instruction?: string;
  questionsCounts: number;
  type: TestType;
  purpose?: TestPurpose;
  author?: string;
  executeTime: string;
  pictureLink: string;
  questions: IQuestion[];
  interpretations: IInterpretation[];
}

/*
 * id                    string     Идентификатор результата
 * sysname               string     Именной идентификатор теста
 * testVersion           string     Версия теста
 * questionsCount        number     Kоличество вопросов
 * startDate             int<UTC>   Дата начала прохождения теста
 * endDate               int<UTC>   Дата окончания прохождения теста
 * executeTime           string     Фактическое время прохождения теста
 * name                  string     Название теста
 * description           string     Описание теста
 * dateStart             int<UTC>   Дата прохождения
 * previewPictureLink    string     Ссылка на prewiev картинку
 */
export interface IPassedTest {
  id: string;
  sysname: string;
  testVersion: string;
  questionsCount: number;
  startDate?: Date;
  endDate?: Date;
  executeTime: string;
  name: string;
  description?: string;
  dateStart: Date;
  previewPictureLink: string;
}

/*
 * id            string     Идентификатор результата
 * sysname       string     Именной идентификатор теста
 * versionView   string     Версия результата
 * userId        string     Идентификатор пользователя
 * startDate     int<UTC>   Дата начала прохождения теста
 * endDate       int<UTC>   Дата окончания прохождения теста
 * executeTime   string     Фактическое время прохождения теста
 * object        object     Динамический объект с данными по интерпретации (словарь ключ - значение)
 * score         -          -
 */
export interface ITestResult {
  id: string;
  sysname: string;
  versionView: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  executeTime: string;
  object: { title: string; value: string }[]; //?
  score: { title: string; value: string }[]; //?
}

export interface IUpdateRequest extends Request {
  payload: {
    // ...
  };
}

export interface ITestListProps {
  sysnames: string[];
}

/*
 *  Эндпойнт не описан в вики, имена полей могут отличаться
 */
export interface ITestCategory {
  id: string;
  name: string;
  testSysnames: string[];
}

export interface ITestResultAnswer {
  questionNumber: number;
  answerNumber: number[];
  inputValue: string;
}

export interface ITestResultPayload {
  sysname: string;
  testVersion: string;
  startDate: Date;
  endDate: Date;
  answers: ITestResultAnswer[];
}
