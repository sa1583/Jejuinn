import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { getPasswordCode } from '../../api/user';

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

export default function FindPasswordForm() {
  const [email, setEmail] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // 인증 번호 받기 눌렀을 때 로직
  // 응답에 따라서 인증번호 입력칸을 활성화 할지
  // 아니면 alert를 실행할지
  const getCode = async () => {
    const res = await getPasswordCode(email);
    switch (res.status) {
      case 200:
        return console.log('인증번호 전송');
    }
  };
  return (
    <Box
      action=""
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3vh',
      }}
    >
      <h1>비밀번호 찾기</h1>
      <CustomTextField
        label="이메일"
        name="email"
        value={email}
        type="email"
        onChange={handleEmail}
      />
      <Button>인증 번호 받기</Button>
    </Box>
  );
}
