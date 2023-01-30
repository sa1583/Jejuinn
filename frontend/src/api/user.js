import { apiInstance } from './index';

const api = apiInstance();

const getTokenHeader = (token) => {
  return {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
};

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
  return api.post('/auth/users', {}, getTokenHeader(token));
};

function loginGoogle(token) {
  return api.post('/api/users/social/google', {}, getTokenHeader(token));
}

function loginKakao(token) {
  let header = {
    headers: {
      access_token: `Bearer ${token}`,
    },
  };
  return api.post('/api/users/social/kakao', {}, header);
}

function loginFacebook(token) {
  return api.post('/api/users/social/facebook', {}, getTokenHeader(token));
}

function loginNormal(body) {
  return api.post('/api/users/login', body);
}

export {
  getOurTokens,
  getUserInfo,
  loginGoogle,
  loginKakao,
  loginFacebook,
  loginNormal,
};
