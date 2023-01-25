import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import KakaoLoginBtn from './KakaoLogin';
import NaverLoginBtn from './NaverLogin';
import GoogleLoginBtn from './GoogleLoginBtn';
import { useState } from 'react';
import axios from 'axios';

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

  // 베이스 url 고쳐야함
  const handleLogInBTN = (e) => {
    console.log(logInForm);
    e.preventDefault();
    axios({
      method: 'post',
      // url: 'baseurl/api/users/login',
      url: 'https://3a3081d4-b5a8-4f0f-a8ca-cee23e10ec3c.mock.pstmn.io/api/users/login',
      data: {
        email: logInForm.email,
        password: logInForm.password,
      },
    })
      .then((res) => {
        // 로그인 버튼 클릭 후 백으로부터 token이 오면 이를 redux에 저장하고,
        // backend에 access token 으로 유저 정보 요청을 한다. (다시 axios)
        //
        // const accessToken = res.headers.accessToken;
        // const refreshToken = res.headers.refreshToken;
        const acc = res.data.accessToken;
        const ref = res.data.refreshToken;
        console.log(acc);
        console.log(ref);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      action=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '6vh',
      }}
    >
      <h1>로그인</h1>
      <CustomTextField
        onChange={handleLogInForm}
        label="이메일"
        name="email"
        value={logInForm.email}
      />
      <CustomTextField
        onChange={handleLogInForm}
        label="비밀번호"
        name="password"
        value={logInForm.password}
      />

      {/* 아래 인풋은 버튼 컴포넌트로 바꿀거임 */}
      <Button
        onClick={handleLogInBTN}
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
          fontSize: '1.5vw',
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
