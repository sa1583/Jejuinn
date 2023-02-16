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
      <h2>가입완료</h2>
      <div style={{ width: '80%', textAlign: 'center', color: '#FF7600' }}>
        가입을 환영합니다!
      </div>
      <div style={{ width: '80%', textAlign: 'center', color: '#FF7600' }}>
        제주인 될 준비 되셨나요?
      </div>
      <Button
        onClick={() => {
          navigate('..');
        }}
        sx={{
          width: '300px',
          height: '50px',
          background: '#FF7600',
          borderRadius: '50px',
          color: 'white',
          '&:hover': {
            color: 'white',
            background: '#FF7600',
          },
          border: 'none',
          fontSize: '1rem',
          marginTop: '5rem',
        }}
      >
        홈으로 이동
      </Button>
    </div>
  );
}
