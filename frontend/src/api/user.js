import { apiInstance } from './index';

const api = apiInstance();

const getTokenHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

async function loginNaver(token) {
  return api.post('/api/users/social/naver', {}, getTokenHeader(token));
}

async function getUserInfo(token) {
  return await api.post('/auth/users', {}, getTokenHeader(token));
}

export { loginNaver, getUserInfo };
