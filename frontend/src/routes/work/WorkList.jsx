import WorkFilterBox from '../../components/work/WorkFilterBox';
import WorkListBox from '../../components/work/WorkListBox';
import { Grid, Box, Button } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function WorkList() {
  return (
    <>
      <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
        <WhiteBox cpn={<WorkFilterBox />} />
        <br />
        <h2> 검색결과</h2>
        <WorkListBox />
      </Box>
      {/* <Button>모집글 추가하는 버튼 우측 하단에 고정...!</Button> */}
    </>
  );
}
