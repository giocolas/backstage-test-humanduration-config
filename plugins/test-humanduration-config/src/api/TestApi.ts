import { createApiRef } from '@backstage/core-plugin-api';
import { HumanDuration } from '@backstage/types';

export const testApiRef = createApiRef<TestApi>({
  id: 'plugin.testhumandurationconfig.service',
});

export interface GetTestConfigParameters {
  normalParameter?: string,
  hasHumanDurationParameter?: boolean,
  humanDurationParameter?: HumanDuration,
}

export interface TestApi {
  get(): Promise<GetTestConfigParameters>;
}