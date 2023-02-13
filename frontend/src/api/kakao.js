import axios from 'axios';

// 리다이렉트 url로 받은 인가코드를 사용하여
// 카카오로 부터 access_token을 받는 로직

export async function getKakaoAccessToken(authToken) {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  return await axios({
    method: 'post',
    url: 'https://kauth.kakao.com/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${authToken}`,
  });
}
