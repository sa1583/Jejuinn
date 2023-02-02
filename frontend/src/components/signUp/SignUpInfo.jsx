import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmail } from '../../api/user';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
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

  width: '70%',
});

const inputBox = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1.3vh',
};

export default function SignUpInfo({ handleNext }) {
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
    name === 'email' && setEmailReceiveAllow(false);
  };

  const [checkPassword, setCheckPassword] = useState('');

  const handleCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const [emailReceiveAllow, setEmailReceiveAllow] = useState(false);

  const getEmailCheck = async () => {
    // const emailAllowed = await checkEmail(signUpForm.email);
    // console.log(emailAllowed);
    setEmailReceiveAllow(true);
  };

  // 유효성 검사 불통과
  const notPassed = (
    <DoNotDisturbAltOutlinedIcon style={{ marginTop: '8px', color: 'red' }} />
  );

  // 유효성 검사 통과
  const Passed = (
    <CheckCircleOutlineOutlinedIcon
      style={{ marginTop: '8px', color: 'green' }}
    />
  );

  // 정규표현식
  // 이메일 형식
  const emailTest =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const emailTestResult = () => emailTest.test(signUpForm.email);
  // 닉네임 형식
  const nickNameTest = /^[A-Za-z가-힣0-9]{2,10}$/;
  const nickNameTestResult = () => nickNameTest.test(signUpForm.nickname);
  // 비밀번호 형식
  const passwordTest = /^[a-z0-9]{7,15}$/;
  const passwordTestResult = () => passwordTest.test(signUpForm.password);

  // 비밀번호 체크
  const passwordCheckResult = () =>
    checkPassword === signUpForm.password && passwordTest.test(checkPassword);

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
      <Box sx={inputBox}>
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
          sx={{
            height: '40px',
            fontSize: '10px',
            fontWeight: '900',
          }}
          onClick={getEmailCheck}
          disabled={!emailTestResult()}
        >
          중복확인
        </Button>
        {emailReceiveAllow ? Passed : notPassed}
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1.3vh',
        }}
      >
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
          {nickNameTestResult() ? Passed : notPassed}
        </Box>
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
        {passwordTestResult() ? Passed : notPassed}
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
        {passwordCheckResult() ? Passed : notPassed}
      </Box>
      <Button
        onClick={handleNext}
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
        disabled={
          !(
            emailReceiveAllow &&
            nickNameTestResult() &&
            passwordCheckResult() &&
            passwordTestResult()
          )
        }
      >
        회원가입
      </Button>
    </div>
  );
}
