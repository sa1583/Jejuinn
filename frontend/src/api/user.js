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

// 기본 로그인 토큰 받기
function loginNormal(body) {
  return api.post('/api/users/login', body);
}

// 회원가입 시 이메일 중복 여부 체크
function checkEmail(body) {
  return api.post('/api/users/email-check', body);
}

// 비밀번호 찾기 인증 코드 발급
function getPasswordCode(body) {
  return api.post('/api/users/pw/reset', body);
}

export {
  getOurTokens,
  getUserInfo,
  loginGoogle,
  loginKakao,
  loginFacebook,
  loginNormal,
  checkEmail,
  getPasswordCode,
};
