import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmail } from '../../api/user';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#535353',
      opacity: '83%',
      // height: '5vh',
    },
    '&:hover fieldset': {
      borderColor: '#FF7600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7600',
    },
  },

  width: '80%',
});

const inputBox = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '1.3vh',
};

export default function SignUpInfo() {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    nickname: '',
    emailReceiveAllow: false,
  });

  const handleSignUpForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  const [checkPassword, setCheckPassword] = useState('');

  const handleCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  // const [emailReceiveAllow, setEmailReceiveAllow] = useState(false);

  const getEmailCheck = async () => {
    const emailAllowed = await checkEmail(signUpForm.email);
    console.log(emailAllowed);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3vh',
        width: '90%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1.3vh',
        }}
      >
        <CustomTextField
          required
          label="이메일"
          type="email"
          name="email"
          value={signUpForm.email}
          onChange={handleSignUpForm}
          placeholder="example@example.com"
          size="small"
          helperText="이메일 형식 / 중복확인 필요"
        />
        <Button
          variant="contained"
          size="small"
          sx={{ height: '3.5vh', fontSize: '15px', marginTop: '3px' }}
          onClick={getEmailCheck}
        >
          중복확인
        </Button>
      </Box>
      <Box sx={inputBox}>
        <CustomTextField
          required
          label="닉네임"
          name="nickname"
          value={signUpForm.nickname}
          onChange={handleSignUpForm}
          size="small"
          helperText="2글자 ~ 10글자"
        />
      </Box>
      <Box sx={inputBox}>
        <CustomTextField
          required
          label="비밀번호"
          type="password"
          name="password"
          value={signUpForm.password}
          onChange={handleSignUpForm}
          helperText="소문자, 숫자 포함 7 ~ 15글자"
          size="small"
        />
      </Box>
      <Box sx={inputBox}>
        <CustomTextField
          required
          label="비밀번호 확인"
          type="password"
          name="checkPassword"
          value={checkPassword}
          onChange={handleCheckPassword}
          size="small"
          helperText="소문자, 숫자 포함 7 ~ 15글자"
        />
      </Box>
      <Button
        onClick={() => {
          navigate('../signup3');
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
        회원가입
      </Button>
    </div>
  );
}
