import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkEmail } from '../../api/user';
import {
  getNormalAuthTokenInSignUp,
  getUserInfoByToken,
} from '../../store/user';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      // borderColor: nickNameTestResult() ? '#0011ff' : '#535353',
      borderColor: '#535353',
      // borderColor: '#3bd643',
      opacity: '83%',
    },
    '&:hover fieldset': {
      // borderColor: '#FF7600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7600',
    },
  },

  width: '80%',
});

export default function SignUpInfo({ handleNext }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    nickname: '',
  });
  const handleSignUp = async () => {
    const body = signUpForm;
    const data = await dispatch(getNormalAuthTokenInSignUp(body));
    dispatch(getUserInfoByToken(data.payload.accesstoken));
    handleNext();
    // 여기에 data 받은후에 200이면 dispatch getuserinfo 하고
    // 에러면 그에따라 alert
  };

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
    const emailAllowed = (await checkEmail(signUpForm.email)).status;
    switch (emailAllowed) {
      case 200:
        setEmailReceiveAllow(true);
        alert('중복 확인 완료');
        break;
      default:
        alert('이미 존재하는 이메일입니다.');
        break;
    }
  };

  // 정규표현식
  // 이메일 형식
  const emailTest =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const emailTestResult = () => emailTest.test(signUpForm.email);
  // 닉네임 형식
  const nickNameTest = /^[A-Za-z가-힣0-9]{2,10}$/;
  const nickNameTestResult = () => nickNameTest.test(signUpForm.nickname);
  // 비밀번호 형식
  const passwordTest = /^(?=.*?[a-z])(?=.*?[0-9]).{7,15}$/;
  const passwordTestResult = () => passwordTest.test(signUpForm.password);

  // 비밀번호 체크
  const passwordCheckResult = () =>
    checkPassword === signUpForm.password && passwordTest.test(checkPassword);

  // 유효성 검사 완료시 TextArea 색깔 변경
  const completedBoxStyle = (condition) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: condition ? '#41ff7a' : '#535353',
        opacity: '83%',
      },
      '&:hover fieldset': {
        borderColor: condition ? '#41ff7a' : '#535353',
      },
      '&.Mui-focused fieldset': {
        borderColor: condition ? '#41ff7a' : 'primary.main',
      },
      '&.Mui-error fieldset': {
        borderColor: !condition && '#ff0000',
      },
    },
    width: '80%',
  });

  // 유효성 검사 완료시 TextArea 라벨 색깔 변경
  const completedLabelStyle = (condition) => ({
    color: condition ? '#41ff7a' : '#535353',
    '&.Mui-focused': {
      color: condition ? '#41ff7a' : 'primary.main',
    },
    '&.Mui-error': {
      color: !condition && '#ff0000',
      fontWeight: 'bolder',
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3rem',
        width: '90%',
        gap: '1rem',
      }}
    >
      <CustomTextField
        sx={completedBoxStyle(emailReceiveAllow)}
        required
        error={Boolean(
          signUpForm.email.length > 0 && emailReceiveAllow === false,
        )}
        label="이메일"
        type="email"
        name="email"
        value={signUpForm.email}
        onChange={handleSignUpForm}
        placeholder="example@example.com"
        size="small"
        helperText="이메일 형식 / 중복확인 필요"
        InputLabelProps={{
          sx: completedLabelStyle(emailReceiveAllow),
        }}
        InputProps={{
          endAdornment: (
            <Button
              position="end"
              variant="contained"
              size="small"
              sx={{
                fontSize: '0.6rem',
                // fontWeight: 'bo',
              }}
              onClick={getEmailCheck}
              disabled={!emailTestResult()}
            >
              중복확인
            </Button>
          ),
        }}
      />

      <CustomTextField
        sx={completedBoxStyle(
          nickNameTestResult() && signUpForm.nickname.length > 0,
        )}
        InputLabelProps={{
          sx: completedLabelStyle(nickNameTestResult()),
        }}
        required
        label="닉네임"
        name="nickname"
        value={signUpForm.nickname}
        onChange={handleSignUpForm}
        size="small"
        helperText="2글자 ~ 10글자, 특수문자 제외"
        error={Boolean(
          signUpForm.nickname.length > 0 && nickNameTestResult() === false,
        )}
      />
      <CustomTextField
        sx={completedBoxStyle(passwordTestResult())}
        InputLabelProps={{
          sx: completedLabelStyle(passwordTestResult()),
        }}
        required
        label="비밀번호"
        type="password"
        name="password"
        value={signUpForm.password}
        onChange={handleSignUpForm}
        helperText="소문자, 숫자 포함 7 ~ 15글자"
        size="small"
        error={Boolean(
          signUpForm.password.length > 0 && passwordTestResult() === false,
        )}
      />
      <CustomTextField
        sx={completedBoxStyle(passwordCheckResult())}
        InputLabelProps={{
          sx: completedLabelStyle(passwordCheckResult()),
        }}
        required
        label="비밀번호 확인"
        type="password"
        name="checkPassword"
        value={checkPassword}
        onChange={handleCheckPassword}
        size="small"
        helperText="소문자, 숫자 포함 7 ~ 15글자"
        error={Boolean(
          checkPassword.length > 0 && passwordCheckResult() === false,
        )}
      />
      <Button
        onClick={handleSignUp}
        sx={{
          width: '70%',
          height: '3rem',
          background: '#FF7600',
          borderRadius: '38px',
          color: 'white',
          '&:hover': {
            color: 'white',
            background: '#FF7600',
          },
          border: 'none',
          fontSize: '1.5rem',
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
