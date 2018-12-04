import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    login: ({ email, googleId }) => client.request({
      method: 'POST',
      url: '/sessions',
      data: {
        email,
        googleId
      }
    }),
    logOut: () => client.request({
      method: 'DELETE',
      url: '/sessions'
    })
  };
};
