import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import KakaoLoginBtn from './KakaoLogin';
import NaverLoginBtn from './NaverLogin';
import GoogleLoginBtn from './GoogleLogin';
import FacebookLoginBtn from './FacebookLogin';
import { useState } from 'react';
import { getNormalAuthToken, getUserInfoByToken } from '../../store/user';
import { useDispatch } from 'react-redux';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#535353',
      opacity: '83%',
    },
    '&:hover fieldset': {
      borderColor: '#FF7600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7600',
    },
  },
  marginTop: '2vh',
  width: '80%',
});

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bottomData = [
    {
      name: '회원가입',
      url: '../signup1',
    },
    null,
    {
      name: '아이디 찾기',
      url: '',
    },
    null,
    {
      name: '비밀번호 찾기',
      url: '',
    },
  ];

  // 페이지 자체 로그인 로직
  const [logInForm, setLogInForm] = useState({ email: '', password: '' });

  const handleLogInForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogInForm({ ...logInForm, [name]: value });
  };

  const login = (e) => {
    e.preventDefault();
    const body = { email: logInForm.email, password: logInForm.password };
    const data = dispatch(getNormalAuthToken(body));
    dispatch(getUserInfoByToken(data));
    return navigate('');
  };

  return (
    <form
      action=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3vh',
      }}
    >
      <h1>로그인</h1>
      <CustomTextField
        onChange={handleLogInForm}
        label="이메일"
        name="email"
        value={logInForm.email}
        type="email"
      />
      <CustomTextField
        onChange={handleLogInForm}
        label="비밀번호"
        name="password"
        value={logInForm.password}
        type="password"
      />

      {/* 아래 인풋은 버튼 컴포넌트로 바꿀거임 */}
      <Button
        onClick={login}
        sx={{
          width: '80%',
          height: '6vh',
          background: '#FF7600',
          borderRadius: '38px',
          color: 'white',
          '&:hover': {
            color: 'white',
            background: '#FF7600',
          },
          border: 'none',
          fontSize: '1.2vw',
          marginTop: '6vh',
        }}
      >
        로그인
      </Button>

      {/* 소셜 로그인 부분 */}
      <h3 style={{ marginTop: '4vh', color: '#FF7600' }}>소셜 로그인</h3>
      <Box sx={{ display: 'flex', gap: '1.5vw' }}>
        <NaverLoginBtn />
        <GoogleLoginBtn />
        <KakaoLoginBtn />
        <FacebookLoginBtn />
      </Box>

      {/* 회원가입 및 유저 정보 찾기 부분 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4vh',
        }}
      >
        {bottomData.map((data) => {
          if (data !== null) {
            return (
              <Link
                to={data.url}
                style={{
                  fontSize: '1vw',
                  textDecoration: 'none',
                  color: 'black',
                }}
                key={uuidv4()}
              >
                {data.name}
              </Link>
            );
          } else {
            return (
              <p style={{ margin: '1vw', fontSize: '1vw' }} key={uuidv4()}>
                |
              </p>
            );
          }
        })}
      </Box>
    </form>
  );
}