import { Button, TextField } from '@mui/material';

export default function SignUpInfo() {
  return (
    <div>
      <h3>회원가입</h3>

      <img src="#" alt="회원가입 진척도 표시하는 바 3칸짜리 들어갈거임~~~~" />
      <br />
      <TextField required multiline label="아이디" />
      <TextField required multiline label="비밀번호" />
      <TextField required multiline label="비밀번호 확인" />
      <TextField required multiline label="닉네임" />
      <TextField required multiline label="이메일" />
      <Button variant="contained">다음</Button>
    </div>
  );
}
