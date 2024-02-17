import { HumanDuration } from '@backstage/types';

export interface Config {
  /**
   * Test parameters
   * @visibility frontend
   */
  test: {

    /**
     * Normal parameter
     * @visibility frontend
     */
    normalParameter?: string;

    /**
     * HumanDuration parameter
     * @visibility frontend
     */
    humanDurationParameter?: HumanDuration;
  }
}