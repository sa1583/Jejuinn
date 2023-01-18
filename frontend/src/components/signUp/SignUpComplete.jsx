import { Button } from '@mui/material';

export default function SignUpComplete() {
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
      <h1>가입완료</h1>
      <img
        src="images/signUpStep3.png"
        alt="회원가입 진척도 표시하는 바 3칸짜리 들어갈거임~~~~"
        style={{ width: '80%' }}
      />{' '}
      <div style={{ width: '80%', marginTop: '3vh', textAlign: 'center' }}>
        가입을 환영합니다
      </div>
      <Button
        href="/"
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
        홈으로 이동
      </Button>
    </div>
  );
}
