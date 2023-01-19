import React from 'react';
import { images } from '../../assets/images';
import { REDIRECT_URI, REST_API_KEY } from './kakaoLoginData';

export default function KakaoLogin() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <img
        src={images.kakao_login}
        alt="카카오 로그인"
        onClick={handleLogin}
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          height: '4rem',
          cursor: 'pointer',
        }}
      />
    </>
  );
}
