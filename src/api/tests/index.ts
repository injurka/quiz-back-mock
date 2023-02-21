import { Express } from 'express';
import { testsRoutes } from './tests.routes';

export function init(server: Express, routePrefix: string) {
  testsRoutes(server, routePrefix);
}
