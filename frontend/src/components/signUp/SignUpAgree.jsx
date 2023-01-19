import {
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

export default function SignAgree() {
  const navigate = useNavigate();
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
        src="images/signUpStep1.png"
        alt="회원가입 진척도 표시하는 바 1칸짜리 들어갈거임~~~~"
        style={{ width: '80%' }}
      />{' '}
      <br />
      <FormGroup>
        <div>
          <FormControlLabel
            sx={{
              width: '270px',
            }}
            control={
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                  color: '#FF7600',
                  '&.Mui-checked': {
                    color: '#FF7600',
                  },
                }}
              />
            }
            label="[필수] 개인정보 이용약관 동의"
          />
          <IconButton
            sx={{
              color: '#FF7600',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div>
          <FormControlLabel
            sx={{
              width: '270px',
            }}
            control={
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                  color: '#FF7600',
                  '&.Mui-checked': {
                    color: '#FF7600',
                  },
                }}
              />
            }
            label="[필수] 서비스 이용약관 동의"
          />
          <IconButton
            sx={{
              color: '#FF7600',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </FormGroup>
      <div
        style={{
          width: '65%',
          marginTop: '1vh',
          textAlign: 'center',
          color: '#FF7600',
          fontSize: '14px',
        }}
      >
        약관 동의 체크는 해당 약관을 모두 숙지하였으며,
      </div>
      <div
        style={{
          width: '65%',
          marginTop: '1vh',
          textAlign: 'center',
          color: '#FF7600',
          fontSize: '14px',
        }}
      >
        {' '}
        이에 동의함을 의미합니다.
      </div>
      <Button
        onClick={() => {
          navigate('../signup2');
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
          marginTop: '2vh',
        }}
      >
        다음
      </Button>
    </div>
  );
}
