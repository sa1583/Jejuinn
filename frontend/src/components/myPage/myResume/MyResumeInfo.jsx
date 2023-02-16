import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../store/user';

export default function MyResumeInfo() {
  // redux에서 유저 정보 가져오기
  const userInfo = useSelector(selectUserInfo);

  return (
    <Box px="3%">
      <Grid container spacing={4}>
        <Grid
          item
          md={12}
          sx={{ fontSize: 23, fontWeight: 'bold', marginBottom: '10px' }}
        >
          개인정보
        </Grid>

        <Grid item md={4} sx={{ fontSize: 20 }}>
          이름
        </Grid>
        <Grid item md={8} sx={{ fontSize: 20, color: '#FF7600' }}>
          {userInfo?.username}
        </Grid>

        <Grid item md={4} sx={{ fontSize: 20 }}>
          나이 (성별)
        </Grid>
        <Grid item md={8} sx={{ fontSize: 20, color: '#FF7600' }}>
          {userInfo?.age}세 ({userInfo?.gender})
        </Grid>

        <Grid item md={4} sx={{ fontSize: 20 }}>
          휴대폰번호
        </Grid>
        <Grid item md={8} sx={{ fontSize: 20, color: '#FF7600' }}>
          {userInfo?.phone}
        </Grid>

        <Grid item md={4} sx={{ fontSize: 20 }}>
          이메일
        </Grid>
        <Grid item md={8} sx={{ fontSize: 20, color: '#FF7600' }}>
          {userInfo?.email}
        </Grid>
      </Grid>
    </Box>
  );
}
