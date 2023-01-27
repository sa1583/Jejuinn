import { Box } from '@mui/material';
import { useRef } from 'react';
import { useEffect } from 'react';
import { images } from '../../assets/images';

export default function NaverLogin() {
  const { naver } = window;
  const naverRef = useRef();

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  const handleNaverLogin = () => {
    naverRef.current.children[0].click();
  };

  return (
    <>
      <Box id="naverIdLogin" ref={naverRef} sx={{ display: 'none' }} />
      <img
        onClick={handleNaverLogin}
        src={images.naver_login}
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          height: '4rem',
          cursor: 'pointer',
        }}
        alt="naver login"
      />
    </>
  );
}
