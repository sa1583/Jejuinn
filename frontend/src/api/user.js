import { apiInstance } from './index';

const api = apiInstance();

const getTokenHeader = (token) => {
  return {
    headers: {
      access_token: `Bearer ${token}`,
    },
  };
};

function loginNaver(token) {
  return api.post('/api/users/social/naver', {}, getTokenHeader(token));
}

function loginKakao(token) {
  return api.post('/api/users/social/kakao', {}, getTokenHeader(token));
}

function loginNormal(body) {
  return api.post('/api/users/login', body);
}

function getUserInfo(token) {
  return api.post('/auth/users', {}, getTokenHeader(token));
}

export { loginNaver, getUserInfo, loginKakao, loginNormal };
