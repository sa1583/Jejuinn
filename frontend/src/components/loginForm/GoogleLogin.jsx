import React from 'react';
import { images } from '../../assets/images';

export default function GoogleLogin() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email&access_type=offline&prompt=consent`;
  const handleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <>
      <img
        src={images.google_login}
        alt="구글로그인"
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
