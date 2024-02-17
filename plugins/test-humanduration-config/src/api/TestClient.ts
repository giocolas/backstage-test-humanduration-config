import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { TestApi, GetTestConfigParameters } from './TestApi';

export class TestClient implements TestApi {
  private readonly fetchApi: FetchApi;
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: { fetchApi: FetchApi; discoveryApi: DiscoveryApi }) {
    this.fetchApi = options.fetchApi;
    this.discoveryApi = options.discoveryApi;
  }

  async getBaseUrl(): Promise<string> {
    return this.discoveryApi.getBaseUrl('test');
  }

  async get(): Promise<GetTestConfigParameters> {
    const url = `${await this.getBaseUrl()}`;

    const response = await this.fetchApi.fetch(`${url}`, {
      method: 'GET',
    });

    const data = (await response.json()) as GetTestConfigParameters;
    
    return data;
  }  
}