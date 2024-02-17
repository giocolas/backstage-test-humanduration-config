import { createRouter } from '@internal/plugin-test-humanduration-config-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin({
  config,
  logger,
}: PluginEnvironment,
) : Promise<Router> {
  return await createRouter({
    config,
    logger,
  });
}