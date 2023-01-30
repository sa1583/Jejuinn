import { allWorkList, filteredWorkList } from '../../api/work';
import WorkFilterBox from '../../components/work/WorkFilterBox';
import WorkListBox from '../../components/work/WorkListBox';
import { Grid, Box, Button } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function WorkList() {
  return (
    <>
      <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <WhiteBox cpn={<WorkFilterBox />} />
          </Grid>
          <Grid item md={12}>
            <h2> 검색결과</h2>
          </Grid>
          <Grid item md={12}>
            <WorkListBox />
          </Grid>
        </Grid>
      </Box>
      {/* <Button>모집글 추가하는 버튼 우측 하단에 고정...!</Button> */}
    </>
  );
}
