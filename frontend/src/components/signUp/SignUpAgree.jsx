import { Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
export default function SignAgree() {
  return (
    <div>
      <h3>회원가입</h3>

      <img src="#" alt="회원가입 진척도 표시하는 바 1칸짜리 들어갈거임~~~~" />
      <br />
      <FormGroup>
        <div>
          <FormControlLabel
            control={<Checkbox />}
            label="[필수] 서비스 이용약관 동의"
          />
          <Button variant="contained">약관확인</Button>
        </div>
        <div>
          <FormControlLabel
            control={<Checkbox />}
            label="[필수] 서비스 이용약관 동의"
          />
          <Button variant="contained">약관확인</Button>
        </div>
      </FormGroup>
      <div>
        약관 동의 체크는 해당 약관을 모두 숙지하였으며, 이에 동의함을
        의미합니다.
      </div>
      <Button variant="contained">다음</Button>
    </div>
  );
}
