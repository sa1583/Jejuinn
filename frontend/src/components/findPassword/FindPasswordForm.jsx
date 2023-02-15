import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { getPasswordCode, resetPassword } from '../../api/user';
import { useNavigate } from 'react-router-dom';

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
  marginTop: '1rem',
  width: '300px',
});

export default function FindPasswordForm() {
  const [email, setEmail] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setCode('');
    setNewPW('');
    setNewPWCheck('');
  };

  const navigate = useNavigate();

  const [userUid, setUserUid] = useState('');

  const [code, setCode] = useState('');
  const [checkCode, setCheckCode] = useState('');

  const getCode = async () => {
    setIsLoading(true);
    try {
      const res = await getPasswordCode(email);
      setCode(res.data.code);
      setUserUid(res.data.userUid);
      setIsLoading(false);
      return alert('이메일로 인증번호가 전송되었습니다.');
    } catch {
      setIsLoading(false);
      return alert('존재하지 않는 이메일입니다.');
    }
  };

  const confirmCode = () => {
    if (code === checkCode) {
      setChecked(true);
      alert('인증번호가 확인되었습니다.');
    } else {
      alert('인증번호가 틀렸습니다.');
    }
  };

  const [checked, setChecked] = useState(false);

  // 비밀번호 형식
  const [newPW, setNewPW] = useState('');
  const passwordTest = /^[a-z0-9]{7,15}$/;
  const passwordTestResult = () => passwordTest.test(newPW);

  // 비밀번호 체크
  const [newPWCheck, setNewPWCheck] = useState('');
  const passwordCheckResult = () =>
    newPWCheck === newPW && passwordTest.test(newPWCheck);

  const completedBoxStyle = (condition) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: condition ? '#00a732' : '#535353',
        opacity: '83%',
      },
      '&:hover fieldset': {
        borderColor: condition ? '#00a732' : '#535353',
      },
      '&.Mui-focused fieldset': {
        borderColor: condition ? '#00a732' : 'primary.main',
      },
      '&.Mui-error fieldset': {
        borderColor: !condition && '#ff0000',
      },
    },
    width: '300px',
  });

  const completedLabelStyle = (condition) => ({
    color: condition ? '#00a732' : '#535353',
    '&.Mui-focused': {
      color: condition ? '#00a732' : 'primary.main',
    },
    '&.Mui-error': {
      color: !condition && '#ff0000',
      fontWeight: 500,
    },
  });

  const resetPasswordSubmit = async () => {
    const body = {
      userUid,
      password: newPW,
    };
    const data = await resetPassword(body);
    if (data.status == 200) {
      alert('비밀번호가 변경되었습니다. 로그인해주세요.');
      navigate('/login');
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box
      action=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5vh',
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <h2>비밀번호 재발급</h2>
      <CustomTextField
        label="이메일"
        name="email"
        value={email}
        type="email"
        variant="standard"
        placeholder="이메일을 입력하세요"
        onChange={(e) => {
          handleEmail(e);
          setChecked(false);
          setCheckCode('');
          setUserUid('');
        }}
        inputProps={{ style: { fontSize: 20 } }}
        InputLabelProps={{ style: { fontSize: 20 } }}
      />
      <Button
        onClick={getCode}
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
          marginTop: '1.2rem',
        }}
      >
        인증 번호 받기
      </Button>
      {code && (
        <>
          <CustomTextField
            label="인증번호 입력"
            name="인증번호 입력"
            variant="standard"
            placeholder="인증번호를 입력하세요"
            value={checkCode}
            onChange={(e) => setCheckCode(e.target.value)}
            disabled={code.length === 0}
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
          <Button
            onClick={confirmCode}
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
              marginTop: '1.2rem',
            }}
          >
            인증 번호 확인
          </Button>
        </>
      )}

      {checked && (
        <>
          <CustomTextField
            sx={completedBoxStyle(passwordTestResult())}
            InputLabelProps={{
              sx: completedLabelStyle(passwordTestResult()),
              style: { fontSize: 20 },
            }}
            required
            label="새로운 비밀번호"
            type="password"
            name="password"
            variant="standard"
            inputProps={{ style: { fontSize: 20 } }}
            value={newPW}
            onChange={(e) => {
              setNewPW(e.target.value);
            }}
            helperText="소문자, 숫자 포함 7 ~ 15글자"
            size="small"
            error={Boolean(newPW.length > 0 && passwordTestResult() === false)}
          />
          <CustomTextField
            sx={completedBoxStyle(passwordCheckResult())}
            InputLabelProps={{
              sx: completedLabelStyle(passwordCheckResult()),
              style: { fontSize: 20 },
            }}
            required
            label="새로운 비밀번호 확인"
            type="password"
            name="checkPassword"
            variant="standard"
            inputProps={{ style: { fontSize: 20 } }}
            value={newPWCheck}
            onChange={(e) => {
              setNewPWCheck(e.target.value);
            }}
            size="small"
            helperText="소문자, 숫자 포함 7 ~ 15글자"
            error={Boolean(
              newPWCheck.length > 0 && passwordCheckResult() === false,
            )}
          />
          <Button
            variant="contained"
            disabled={!(passwordCheckResult() && passwordTestResult())}
            onClick={resetPasswordSubmit}
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
              marginTop: '1.2rem',
            }}
          >
            비밀번호 변경
          </Button>
        </>
      )}
    </Box>
  );
}
