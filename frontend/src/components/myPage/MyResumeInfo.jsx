import { Box, Grid } from '@mui/material';
import { selectUserInfo } from '../../store/user';

export default function MyResumeInfo() {
  // redux에서 유저 정보 가져오기
  const user = selectUserInfo;
  console.log(user);
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <h1>지원서</h1>
      <Grid container spacing={2}>
        <Grid item md={4}>
          이름(성별)
        </Grid>
        <Grid item md={8}>
          유저 정보 가져와서 이름이랑 성별 표시
        </Grid>

        <Grid item md={4}>
          생년월일(나이)
        </Grid>
        <Grid item md={8}>
          유저 정보 가져와서 생년월일 표시
        </Grid>

        <Grid item md={4}>
          휴대폰번호
        </Grid>
        <Grid item md={8}>
          유저 정보 가져와서 휴대폰번호 표시
        </Grid>

        <Grid item md={4}>
          이메일
        </Grid>
        <Grid item md={8}>
          유저 정보 가져와서 이메일 표시
        </Grid>

        <Grid item md={4}>
          인스타그램
        </Grid>
        <Grid item md={8}>
          유저 정보 가져와서 인스타 링크 연결
        </Grid>
      </Grid>
    </Box>
  );
}
