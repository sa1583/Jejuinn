import WorkFilterBox from '../../components/work/WorkFilterBox';
import { allWorkList, filteredWorkList } from '../../api/work';
import WorkListBox from '../../components/work/WorkListBox';
import { Box } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useEffect, useState } from 'react';

export default function WorkList() {
  const [works, setWorks] = useState([]);

  const onSearch = (imp) => {
    console.log('필터 조건드류ㅠㅠ');
    console.log(imp);
    console.log('필터 조건드류ㅠㅠ');

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
