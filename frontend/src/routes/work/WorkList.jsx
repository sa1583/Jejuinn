import WorkFilterBox from '../../components/work/WorkFilterBox';
import WorkListBox from '../../components/work/WorkListBox';

import { allWorkList, filteredWorkList } from '../../api/work';
import { Box } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useEffect, useState } from 'react';

export default function WorkList() {
  const [works, setWorks] = useState([]);

  const onSearch = (imp) => {
    setWorks(filteredWorkList(imp));
  };

  useEffect(() => {
    setWorks(allWorkList());
  }, []);

  return (
    <>
      <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
        <WhiteBox cpn={<WorkFilterBox onSearch={onSearch} />} />
        <WorkListBox works={works} />
      </Box>
      {/* <Button>모집글 추가하는 버튼 우측 하단에 고정...!</Button> */}
    </>
  );
}
