import { Box, Button } from '@mui/material';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function NaverLogin() {
  const { naver } = window;
  const naverRef = useRef();

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = 'http://localhost:3000/login/naver';

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
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
      <Button onClick={handleNaverLogin}>
        <img
          src="images/naver_login.png"
          style={{
            height: '4rem',
          }}
        />
      </Button>
    </>
  );
}
