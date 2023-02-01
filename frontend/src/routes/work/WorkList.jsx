import { allWorkList, filteredWorkList } from '../../api/work';
import WorkFilterBox from '../../components/work/WorkFilterBox';
import WorkListBox from '../../components/work/WorkListBox';
import { Grid, Box, Button } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useEffect, useState } from 'react';

export default function WorkList() {
  useEffect(() => {
    // 처음에 전체 리스트 한번 호출
  }, []);

  return (
    <>
      <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
        <WhiteBox cpn={<WorkFilterBox />} />
        <WorkListBox />
      </Box>
      {/* <Button>모집글 추가하는 버튼 우측 하단에 고정...!</Button> */}
    </>
  );
}
