import { Box, Button } from '@mui/material';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginNaver } from '../../api/user';
import { login } from '../../store/user';

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
    window.location.href.includes('access_token') && getToken();
  };

  const getToken = async () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log('token', token);
    const response = await loginNaver(token);
    if (response.status === 200) {
      // 토큰 저장
      console.log(response.data);
      dispatch(getAccessToken(response.data.accessToken));
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return navigate('/');
    } else {
      alert('로그인 중 에러가 발생하였습니다.');
    }
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
