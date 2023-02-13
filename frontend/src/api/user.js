// import { apiInstance } from './index';
import instance from '.';

// const api = apiInstance();

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
      socialToken: `Bearer ${token}`,
      state,
    },
  };
  return instance.post('/api/users/social/naver', {}, config);
};

const getUserInfo = (token) => {
  return instance.post('/auth/users', {}, getTokenHeader(token));
};

function loginGoogle(token) {
  let header = {
    headers: {
      socialToken: `Bearer ${token}`,
    },
  };
  return instance.post('/api/users/social/google', {}, header);
}

function loginKakao(token) {
  let header = {
    headers: {
      socialToken: `Bearer ${token}`,
    },
  };
  return instance.post('/api/users/social/kakao', {}, header);
}

function loginFacebook(token) {
  let header = {
    headers: {
      socialToken: `Bearer ${token}`,
    },
  };
  return instance.post('/api/users/social/facebook', {}, header);
}

// 기본 로그인 토큰 받기
function loginNormal(body) {
  return instance.post('/api/users/login', body);
}

// 회원가입 시 이메일 중복 여부 체크
function checkEmail(body) {
  return instance.post('/api/users/email-check', body);
}

// 회원가입
function signUpApi(body) {
  return instance.post('/api/users', body);
}

// 비밀번호 찾기 인증 코드 발급
function getPasswordCode(body) {
  return instance.post('/api/users/pw/reset', body);
}

const processNaverAuth = (accessToken, socialToken) => {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
      socialToken: `Bearer ${socialToken}`,
    },
  };
  return instance.post('/api/users/social/auth/users/naver-auth', {}, header);
};

// refreshToken으로 accessToken 재발급
/**
 * freshToken으로 accessToken 재발급
 * @param {refreshTOken} refreshToken
 * @returns
 */
const renewAccessToken = (refreshToken) => {
  const header = {
    headers: {
      refreshToken: `Bearer ${refreshToken}`,
    },
  };
  return instance.post('/api/users/refresh', {}, header);
};

// 로그아웃
function logout(uid) {
  return instance.post(`/auth/users/logout/${uid}`);
}

// 비밀번호 초기화
function resetPassword(body) {
  return instance.post('api/users/pw-change', body);
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
  signUpApi,
  processNaverAuth,
  getTokenHeader,
  renewAccessToken,
  resetPassword,
};
