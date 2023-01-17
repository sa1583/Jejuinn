import { TextField } from '@mui/material';
import { Box } from '@mui/system';

export default function LoginForm() {
  return (
    <form
      action=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3rem',
      }}
    >
      <h1>로그인</h1>
      <TextField
        label="아이디"
        style={{ width: '90%', marginTop: '2vh' }}
        color="warning"
      />
      <TextField label="비밀번호" style={{ width: '90%', marginTop: '2vh' }} />
      {/* 아래 인풋은 버튼 컴포넌트로 바꿀거임 */}
      <input
        type="submit"
        value={'로그인'}
        style={{ width: '60%', height: '4vh', marginTop: '2vh' }}
      />

      <h3>소셜 로그인</h3>

      {/* 아래 박스는 나중에 소셜 로고로 바꿀거임 */}
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            background: 'green',
            borderRadius: '10px',
          }}
        ></div>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            background: 'green',
            borderRadius: '10px',
          }}
        ></div>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            background: 'green',
            borderRadius: '10px',
          }}
        ></div>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            background: 'green',
            borderRadius: '10px',
          }}
        ></div>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <p
          style={{
            fontSize: '0.5rem',
            display: 'flex',
            textAlign: 'center',
          }}
        >
          회원가입
        </p>
        <p style={{ margin: '1rem', fontSize: '0.5rem' }}>|</p>
        <p style={{ fontSize: '0.5rem' }}>아이디 찾기</p>
        <p style={{ margin: '1rem', fontSize: '0.5rem' }}>|</p>
        <p style={{ fontSize: '0.5rem' }}>비밀번호 찾기</p>
      </Box>
    </form>
  );
}
