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
      socialToken: `Bearer ${token}`,
      state,
    },
  };
  return api.post('/api/users/social/naver', {}, config);
};

const getUserInfo = (token) => {
  return api.post('/auth/users', {}, getTokenHeader(token));
};

function loginGoogle(token) {
  let header = {
    headers: {
      socialToken: `Bearer ${token}`,
    },
  };
  return api.post('/api/users/social/google', {}, header);
}

function loginKakao(token) {
  let header = {
    headers: {
      socialToken: `Bearer ${token}`,
    },
  };
  return api.post('/api/users/social/kakao', {}, header);
}

function loginFacebook(token) {
  let header = {
    headers: {
      socialToken: `Bearer ${token}`,
    },
  };
  return api.post('/api/users/social/facebook', {}, header);
}

// 기본 로그인 토큰 받기
function loginNormal(body) {
  return api.post('/api/users/login', body);
}

// 회원가입 시 이메일 중복 여부 체크
function checkEmail(body) {
  return api.post('/api/users/email-check', body);
}

// 회원가입
function signUpApi(body) {
  return api.post('/api/users', body);
}

// 비밀번호 찾기 인증 코드 발급
function getPasswordCode(body) {
  return api.post('/api/users/pw/reset', body);
}

const processNaverAuth = (accessToken, socialToken) => {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
      socialToken: `Bearer ${socialToken}`,
    },
  };
  return api.post('/api/users/social/auth/users/naver-auth', {}, header);
};

const changeAutoApply = (accessToken, uid) => {
  const header = {
    headers: {
      accessToken: `Bearer ${accessToken}`,
    },
  };
  console.log('header', header);
  return api.put(`/auth/auto-apply/${uid}`, {}, header);
};

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
  changeAutoApply,
};
