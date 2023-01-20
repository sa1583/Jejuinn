import { apiInstance } from './index';

const api = apiInstance();

const getTokenHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

function loginNaver(token) {
  return api.post('/api/users/social/naver', {}, getTokenHeader(token));
}

function getUserInfo(token) {
  return api.post('/auth/users', {}, getTokenHeader(token));
}

export { loginNaver, getUserInfo };
