import { Grid } from '@mui/material';
import WhiteBox from '../whiteBox/WhiteBox';
import { Box } from '@mui/system';
import MapApi from '../mapApi/MapApi';

export default function HouseInfo() {
  return (
    <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
      <Grid container spacing={4}>
        <Grid item md={4}>
          <Box>게하 이름</Box>
          <Box>게하기본정보</Box>
          <WhiteBox cpn={<MapApi />} />
          <Box>#태그1 # 파티게하 #조용한 #인싸</Box>
        </Grid>
        <Grid item md={8}>
          <img src="#" alt="게하시진 들어갈꺼임~" />
          <div>소개글</div>
        </Grid>
      </Grid>
    </Box>
  );
}
