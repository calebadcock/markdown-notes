import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getNotes: () => client.request({
      method: 'GET',
      url: '/user/notes',
    }),

    updateNote: (id, text) => client.request({
      method: 'PUT',
      url: '/user/notes',
      data: {
          id,
          text
      }
    }),
  };
};
