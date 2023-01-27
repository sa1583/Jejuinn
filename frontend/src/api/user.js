import { apiInstance } from './index';

const api = apiInstance();

const getOurTokens = (token, state) => {
  const config = {
    headers: {
      access_token: `Bearer ${token}`,
      state: `${state}`,
    },
  };
  return api.post('/api/users/social/naver', {}, config);
};

const getUserInfo = (token) => {
  const config = () => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  return api.post('/auth/users', {}, config);
};

export { getOurTokens, getUserInfo };
