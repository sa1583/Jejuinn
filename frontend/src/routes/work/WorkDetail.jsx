import { workDetail } from "../../api/work";
import { Grid, Box } from "@mui/material";

export default function WorkDetail() {

  // 받아온 데이터 피그마에 있는 모양으로 렌더링하기
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <div>모집요건</div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div>공고 상세</div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>위치정보</div>
        </Grid>
      </Grid>
    </Box>
  );
}