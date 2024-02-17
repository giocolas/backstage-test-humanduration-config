import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  fetchApiRef
} from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';
import { TestClient, testApiRef } from './api';

export const testHumandurationConfigPlugin = createPlugin({
  id: 'test-humanduration-config',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: testApiRef,
      deps: { fetchApi: fetchApiRef, discoveryApi: discoveryApiRef },
      factory: ({ fetchApi, discoveryApi }) => new TestClient({ fetchApi, discoveryApi }),
    }),
  ],
});

export const TestHumandurationConfigPage = testHumandurationConfigPlugin.provide(
  createRoutableExtension({
    name: 'TestHumandurationConfigPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
