import { Box, Button } from '@mui/material';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNaverAuthToken, getUserInfoByToken } from '../../store/user';

export default function NaverLogin() {
  const { naver } = window;
  const naverRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = 'http://localhost:3000/login';

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

  const userAccessToken = () => {
    window.location.href.includes('access_token') && fetchToken();
  };

  const fetchToken = async () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    const { accessToken } = dispatch(getNaverAuthToken(token));
    dispatch(getUserInfoByToken(accessToken));
    return navigate('/');
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
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
