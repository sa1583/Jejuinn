import { workDetail } from '../../api/work';
import { Grid, Box } from '@mui/material';
import WorkDetailJob from '../../components/work/JobDetail';
import HouseInfo from '../../components/work/HouseInfo';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function WorkDetail() {
  // 받아온 데이터 피그마에 있는 모양으로 렌더링하기
  // 공고 갯수 만큼 반복하면서 WorkDetailContent 컴포넌트 재사용
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <WhiteBox cpn={<HouseInfo />} />
        </Grid>
        <Grid item xs={12} md={12} my={4}>
          <h2 style={{ color: '#FF7600' }}>직무별 상세 및 지원</h2>
          <div>
            채용 디테일 설명 구구절절.. 사장님이 작성한 내용 가져올거임......!
          </div>
        </Grid>

        <Grid item md={12}>
          <h2 style={{ color: '#FF7600' }}>
            해당 게스트하우스에서 진행중인 다른 채용
          </h2>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <WorkDetailJob />
          </Grid>
          <Grid item xs={12} md={4}>
            <WorkDetailJob />
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Box>
  );
}
