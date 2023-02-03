import { Box, Grid, styled, Button } from '@mui/material';
import MyResumeApplyCareerBox from './MyResumeApplyCareerBox';

export default function MyResumeApply({ changeApplyComp }) {
  return (
    <Box sx={{ paddingBottom: '3rem', paddingX: '10%' }}>
      <Button onClick={changeApplyComp}>수정</Button>
      <Grid container spacing={2}>
        <Grid item md={4}>
          선호 스타일
        </Grid>
        <Grid item md={8}>
          userInfo.username
        </Grid>

        <Grid item md={4}>
          선호 지역
        </Grid>
        <Grid item md={8}>
          userInfo.age, userInfo.gender
        </Grid>

        <Grid item md={4}>
          입도 가능일
        </Grid>
        <Grid item md={8}>
          userInfo.phone
        </Grid>

        <Grid item md={4}>
          자기소개
        </Grid>
        <Grid item md={8}>
          userInfo.email
        </Grid>
        <Grid item md={4}>
          근무이력
        </Grid>

        <Grid item md={8}>
          <MyResumeApplyCareerBox />
        </Grid>
      </Grid>
    </Box>
  );
}
