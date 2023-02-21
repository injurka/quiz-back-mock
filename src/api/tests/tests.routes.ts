import { Express } from 'express';
import { Route } from 'server/constants';

import { TestsController } from './tests.controller';

export function testsRoutes(server: Express, routePrefix = '/v1') {
  const controller = new TestsController();

  /*
   *  Тип:        POST
   *  Эндпоинт:   /tests/
   *  Назначение: Получение списка всех тестов
   *  Примечание: Эндпоинт предназначен для получения списка тестов по sysname и
   *              testVersion, полученных из CRS
   */
  server.post(`${routePrefix}${Route.TESTS}/list`, controller.getListBySysnames);

  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/{sysname}?{version}
   *  Назначение: Получение теста последней версии или определенной версии (контентная часть + вопросы)
   *  Примечание: - Если задан только sysname, возвращается последняя версия теста
   *              - Если задан параметр version, возвращается определенная версия теста
   *
   *  Ошибки:     Если параметры запроса заданы неправильно, то SBL возвращает 400 "Неправильно заданы параметры".
   */
  server.get(`${routePrefix}${Route.TESTS}/:sysname`, controller.getBySysname);

  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/results/{objectId}
   *  Назначение: Получение результатов теста конкретного пользователя (интерпретация)
   */
  server.get(`${routePrefix}${Route.TESTS}/results/:objectId`, controller.getResults);

  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/passed
   *  Назначение: Получение списка пройденных тестов
   *  Примечание: Эндпоинт возвращает список последних прохождений
   *              тестов в единичном экземпляре на каждый тест.
   *              Возвращается самый последний результат по каждому тесту.
   */
  server.get(`${routePrefix}${Route.TESTS}/passed`, controller.getPassed);

  /*
   *  Тип:        GET
   *  Эндпоинт:   /tests/categories
   *  Назначение: Получение категорий
   *  Примечание: Эндпоинт возвращает список категорий и sysnames принадлежащих ей тестов
   *              Эндпойнт будет находится в CRS
   */
  server.get(`${routePrefix}${Route.TESTS}/categories`, controller.getCategories);

  /*
   *  Тип:        POST
   *  Эндпоинт:   /tests/results
   *  Назначение: Сохранение результатов теста пользователя (вопросы и ответы)
   *  Примечание: -
   *  Ошибки:     -
   */
  server.post(`${routePrefix}${Route.TESTS}/results`, controller.submitTestResult);
}
