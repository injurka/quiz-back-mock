import { Request } from '@hapi/hapi';

export enum QuestionContentType {
  Audio = 'audio',
  Video = 'video',
  Image = 'image'
}

export enum AnswerContentType {
  Text = 'text',
  Image = 'image'
}

export const enum AnswerType {
  Typed,
  Unique
}

export const enum AnswersView {
  Radiobutton,
  Select
}

/*
 * number       int       +   Порядковый номер ответа
 * contentType  string    +   Тип контента ответа: Текст, Изображение
 * value        string    -   Значение ответа
 * isSelected   boolean   +   Признак выбора пользователем ответа
 */

export interface IAnswer {
  number: number;
  contentType: AnswerContentType;
  value?: string;
}

/*
 *  number        int      +   Порядковый номер вопроса
 *  text          string   +   Текст вопроса
 *  contentType   string   -   Тип контента вопроса: Аудио, Видео, Изображение
 *  contentLink   string   -   Путь к контенту (ссылка)
 *  answersType   int      +   Тип ответа: Типизированный/Уникальный
 *  answersView   int      +   Вид ответа: Raddiobatton, select и тд
 *  answersArray  array    +   Массив ответов
 */

export interface IQuestion {
  number: number;
  text: string;
  answersType: AnswerType;
  answersView: AnswersView;
  contentType?: QuestionContentType;
  contentLink?: string;
  answersArray: IAnswer[];
}

export interface IUpdateRequest extends Request {
  payload: {
    // ...
  };
}
