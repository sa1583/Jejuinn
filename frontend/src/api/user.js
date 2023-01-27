import { apiInstance } from './index';

const api = apiInstance();

const getOurTokens = (token, state) => {
  const config = {
    headers: {
      access_token: `Bearer ${token}`,
      state,
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

export { getOurTokens, getUserInfo, loginGoogle, loginKakao, loginNormal };
