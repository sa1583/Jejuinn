import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectUserInfo } from '../../store/user';

export default function MyResumeInfo() {
  // redux에서 유저 정보 가져오기
  const userInfo = useSelector(selectUserInfo);

  return (
    <Box p="3%">
      <h1>지원서</h1>
      <Grid container spacing={2}>
        <Grid item md={4}>
          이름
        </Grid>
        <Grid item md={8}>
          {userInfo.username}
        </Grid>

        <Grid item md={4}>
          나이 (성별)
        </Grid>
        <Grid item md={8}>
          {userInfo.age} ({userInfo.gender})
        </Grid>

        <Grid item md={4}>
          휴대폰번호
        </Grid>
        <Grid item md={8}>
          {userInfo.phone}
        </Grid>

        <Grid item md={4}>
          이메일
        </Grid>
        <Grid item md={8}>
          {userInfo.email}
        </Grid>
      </Grid>
    </Box>
  );
}
