import axios from 'axios';

// 리다이렉트 url로 받은 인가코드를 사용하여
// 페이스북으로 부터 access_token을 받는 로직

export async function getFacebookAccessToken(auth_code) {
  const FACEBOOK_CLIENT_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID;
  const FACEBOOK_CLIENT_SECRET = process.env.REACT_APP_FACEBOOK_CLIENT_SECRET;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  return await axios({
    method: 'post',
    url: 'https://graph.facebook.com/v15.0/oauth/access_token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: `client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${FACEBOOK_CLIENT_SECRET}&code=${auth_code}`,
  });
}
