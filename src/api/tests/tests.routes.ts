import * as Hapi from '@hapi/hapi';
import * as Joi from 'joi';
import { RequestMethodEnum, Route } from 'server/constants';

import { TestsController } from './tests.controller';

export function testsRoutes(server: Hapi.Server, routePrefix = '/v1') {
  const controller = new TestsController();

  server.bind(controller);
  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/
   *  Назначение: Получение списка всех тестов
   *  Примечание: Эндпоинт предназначен для получения списка тестов по sysname и
   *              testVersion, полученных из CRS
   */
  server.route({
    method: RequestMethodEnum.Post,
    path: `${routePrefix}${Route.TESTS}/list`,
    options: {
      handler: controller.getListBySysnames,
      tags: ['api']
    }
  });

  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/{sysname}?{version}
   *  Назначение: Получение теста последней версии или определенной версии (контентная часть + вопросы)
   *  Примечание: - Если задан только sysname, возвращается последняя версия теста
   *              - Если задан параметр version, возвращается определенная версия теста
   *
   *  Ошибки:     Если параметры запроса заданы неправильно, то SBL возвращает 400 "Неправильно заданы параметры".
   */
  server.route({
    method: RequestMethodEnum.Get,
    path: `${routePrefix}${Route.TESTS}/{sysname}`,
    options: {
      handler: controller.getBySysname,
      tags: ['api'],
      validate: {
        query: Joi.object({
          sysname: Joi.string()
        }).options({
          stripUnknown: true,
          messages: { 'any.default': 'Неправильно заданы параметры' }
        })
      }
    }
  });

  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/results/{objectId}
   *  Назначение: Получение результатов теста конкретного пользователя (интерпретация)
   */
  server.route({
    method: RequestMethodEnum.Get,
    path: `${routePrefix}${Route.TESTS}/results/{objectId}`,
    options: {
      handler: controller.getResults,
      tags: ['api'],
      validate: {
        query: Joi.object({
          objectId: Joi.string()
        }).options({
          stripUnknown: true,
          messages: { 'any.default': 'Неправильно заданы параметры' }
        })
      }
    }
  });

  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/passed
   *  Назначение: Получение списка пройденных тестов
   *  Примечание: Эндпоинт возвращает список последних прохождений
   *              тестов в единичном экземпляре на каждый тест.
   *              Возвращается самый последний результат по каждому тесту.
   */
  server.route({
    method: RequestMethodEnum.Get,
    path: `${routePrefix}${Route.TESTS}/passed`,
    options: {
      handler: controller.getPassed,
      tags: ['api']
    }
  });

  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/categories
   *  Назначение: Получение категорий
   *  Примечание: Эндпоинт возвращает список категорий и sysnames принадлежащих ей тестов
   *              Эндпойнт будет находится в CRS
   */
  server.route({
    method: RequestMethodEnum.Get,
    path: `${routePrefix}${Route.TESTS}/categories`,
    options: {
      handler: controller.getCategories,
      tags: ['api']
    }
  });

  /*
   *  Тип:        POST
   *  Эндпоинт:   /tests/results
   *  Назначение: Сохранение результатов теста пользователя (вопросы и ответы)
   *  Примечание: -
   *  Ошибки:     -
   */
  server.route({
    method: RequestMethodEnum.Post,
    path: `${routePrefix}${Route.TESTS}/results`,
    options: {
      handler: controller.submitTestResult,
      tags: ['api'],
      validate: {
        payload: Joi.object({
          sysname: Joi.string(),
          testVersion: Joi.string(),
          startDate: Joi.date(),
          endDate: Joi.date(),
          answers: Joi.array()
        }).options({
          stripUnknown: true,
          messages: { 'any.default': 'Неправильно заданы параметры' }
        })
      }
    }
  });
}
