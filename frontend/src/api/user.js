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
function loginGoogle(token) {
  return api.post('/api/users/social/google', {}, getTokenHeader(token));
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

export { loginNaver, getUserInfo, loginGoogle, loginKakao, loginNormal };
