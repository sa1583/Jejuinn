import { Box, Grid, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../store/user';
import { useNavigate } from 'react-router';

export default function MyResumeInfo() {
  // redux에서 유저 정보 가져오기
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
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
          userInfo.age, userInfo.gender 정보가 없져
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

        <Grid item md={4}>
          인스타그램
        </Grid>
        <Grid item md={8}>
          <a href="유저의 인스타그램 주소'/https://www.instagram.com/유저인스타아이디/'">
            @userInfo.유저인스타아이디
          </a>
        </Grid>
      </Grid>
    </Box>
  );
}
