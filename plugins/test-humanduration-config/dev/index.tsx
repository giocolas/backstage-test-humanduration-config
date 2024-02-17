import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { testHumandurationConfigPlugin, TestHumandurationConfigPage } from '../src/plugin';

createDevApp()
  .registerPlugin(testHumandurationConfigPlugin)
  .addPage({
    element: <TestHumandurationConfigPage />,
    title: 'Root Page',
    path: '/test-humanduration-config'
  })
  .render();
