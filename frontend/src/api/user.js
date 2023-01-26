import axios from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const getTokenHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getNaverAccessToken = (code) => {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_SERCRET = process.env.REACT_APP_NAVER_SERCRET;
  return axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SERCRET}&code=${code}`,
  );
};

const getOurTokens = (token) => {
  return api.post('/api/users/social/naver', {}, getTokenHeader(token));
};

function getUserInfo(token) {
  return api.post('/auth/users', {}, getTokenHeader(token));
}

export { getNaverAccessToken, getOurTokens, getUserInfo };
