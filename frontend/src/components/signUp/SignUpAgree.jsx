import {
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  IconButton,
  Box,
} from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

export default function SignAgree({ handleNext }) {
  const [agree, setAgree] = useState({ first: false, second: false });
  const handleAgree = (e) => {
    const name = e.target.name;
    setAgree((prev) => ({ ...agree, [name]: !prev[name] }));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3rem',
        width: '100%',
      }}
    >
      <FormGroup>
        <Box sx={{ display: 'flex', marginTop: '1rem' }}>
          <FormControlLabel
            sx={{
              width: '100%',
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
                value={agree.first}
                name="first"
                onChange={handleAgree}
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
        </Box>
        <Box sx={{ display: 'flex' }}>
          <FormControlLabel
            sx={{
              width: '100%',
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
            value={agree.second}
            name="second"
            onChange={handleAgree}
          />
          <IconButton
            sx={{
              color: '#FF7600',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </FormGroup>
      <div
        style={{
          width: '65%',
          marginTop: '3rem',
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
          textAlign: 'center',
          color: '#FF7600',
          fontSize: '14px',
        }}
      >
        이에 동의함을 의미합니다.
      </div>
      <Button
        onClick={() => {
          handleNext();
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
          marginTop: '2.8rem',
        }}
        disabled={agree.first === true && agree.second === true ? false : true}
      >
        다음
      </Button>
    </div>
  );
}
