import { Box, Stack, Typography } from '@mui/material';
import { useRef } from 'react';
import { useEffect } from 'react';
import WhiteBox from '../whiteBox/WhiteBox';

export default function NaverAuth() {
  const { naver } = window;
  const naverRef = useRef();

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_AUTH_CALLBACK_URL = process.env.REACT_APP_NAVER_AUTH_CALLBACK_URL;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_AUTH_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: 50 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  // const handleNaverLogin = () => {
  //   naverRef.current.children[0].click();
  // };

  return (
    <Stack direction="column" height="480px" alignItems="center">
      <Typography variant="h6" sx={{ marginTop: '9rem' }}>
        네이버 인증 후 지원서 작성이 가능합니다
      </Typography>
      <Typography variant="h6">
        아래 버튼을 클릭하여 네이버 인증을 완료해주세요 :)
      </Typography>
      <br />
      <Box id="naverIdLogin" ref={naverRef} />
    </Stack>
  );
}
