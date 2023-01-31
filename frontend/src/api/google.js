import axios from 'axios';

// 리다이렉트 url로 받은 인가코드를 사용하여
// 구글로 부터 access_token을 받는 로직

export async function getGoogleAccessToken(auth_code) {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  return await axios({
    method: 'post',
    url: 'https://oauth2.googleapis.com/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: `client_secret=${GOOGLE_CLIENT_SECRET}&grant_type=authorization_code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&code=${auth_code}`,
  });
}
