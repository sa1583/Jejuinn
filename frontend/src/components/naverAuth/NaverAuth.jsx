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
    <WhiteBox
      cpn={
        <Stack
          direction="column"
          height="480px"
          alignItems="center"
          justifyContent="space-around"
        >
          <Typography variant="h4">
            네이버 인증을 진행해야 지원서를 작성할 수 있습니다.
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography variant="h4">네이버 인증하기</Typography>
            <Box id="naverIdLogin" ref={naverRef} />
          </Stack>
        </Stack>
      }
      sx={{ height: '100px' }}
    />
  );
}
