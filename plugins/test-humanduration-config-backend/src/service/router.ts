import { errorHandler } from '@backstage/backend-common';
import { Config, readDurationFromConfig } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

export interface RouterOptions {
  config: Config;
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { config, logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/', (_, response) => {
    logger.info('TEST!');
    const normalParameter = config.getOptionalString('test.normalParameter') ?? 'This is default value set in backend';
    const hasHumanDurationParameter = config.has('test.humanDurationParameter');
    const humanDurationParameter = hasHumanDurationParameter
                                   ? readDurationFromConfig(config, { key: 'test.humanDurationParameter' } )
                                   : { months: 1}
    response.json({
      normalParameter: normalParameter,
      hasHumanDurationParameter: hasHumanDurationParameter,
      humanDurationParameter: humanDurationParameter,
    });
  });

  router.use(errorHandler());
  return router;
}
