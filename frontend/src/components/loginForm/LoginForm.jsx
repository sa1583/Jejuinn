import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import KakaoLoginBtn from './KakaoLogin';
import NaverLoginBtn from './NaverLogin';
import GoogleLogin from './GoogleLogin';

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
      <CustomTextField label="아이디" />
      <CustomTextField label="비밀번호" />

      {/* 아래 인풋은 버튼 컴포넌트로 바꿀거임 */}
      <Button
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
        <GoogleLogin />
        <KakaoLogin />
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
              <p style={{ margin: '1rem', fontSize: '1vw' }} key={uuidv4()}>
                |
              </p>
            );
          }
        })}
      </Box>
    </form>
  );
}