import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

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

export default function SignUpInfo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '6vh',
      }}
    >
      <h1>회원가입</h1>
      <img
        src="images/signUpStep2.png"
        alt="회원가입 진척도 표시하는 바 2칸짜리 들어갈거임~~~~"
        style={{ width: '80%' }}
      />
      <br />
      <CustomTextField required multiline label="아이디" />
      <CustomTextField required multiline label="이메일" />
      <CustomTextField required multiline label="닉네임" />
      <CustomTextField required multiline label="비밀번호" />
      <CustomTextField required multiline label="비밀번호 확인" />
      <br />
      <Button
        href="/signup3"
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
          marginTop: '2vh',
        }}
      >
        다음
      </Button>{' '}
    </div>
  );
}
