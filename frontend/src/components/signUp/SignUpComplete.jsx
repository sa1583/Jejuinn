import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignUpComplete() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '6vh',
        width: '100%',
      }}
    >
      <h1>가입완료</h1>
      <div style={{ width: '80%', marginTop: '3vh', textAlign: 'center' }}>
        가입을 환영합니다
      </div>
      <Button
        onClick={() => {
          navigate('..');
        }}
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
          marginTop: '20%',
        }}
      >
        홈으로 이동
      </Button>
    </div>
  );
}
