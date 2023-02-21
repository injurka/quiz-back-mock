import * as Hapi from '@hapi/hapi';

import { testsRoutes } from './tests.routes';

export function init(server: Hapi.Server, routePrefix: string) {
  testsRoutes(server, routePrefix);
}
