import WorkFilterBox from '../../components/work/WorkFilterBox';
import { allWorkList, filteredWorkList } from '../../api/work';
import WorkListBox from '../../components/work/WorkListBox';
import { Box } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useEffect, useState } from 'react';
import MyWorkList from '../../components/work/MyWorkList';
import { selectIsLogin } from '../../store/user';
import { useSelector } from 'react-redux';

export default function WorkList() {
  const isLogin = useSelector(selectIsLogin);
  const [works, setWorks] = useState([]);

  // const myhouse = useSelector();

  async function getWorks() {
    const data = await allWorkList();
    setWorks(data.data.content);
  }

  const onSearch = (imp) => {
    setWorks(filteredWorkList(imp));
  };

  useEffect(() => {
    getWorks();
  }, []);

  console.log(works);
  return (
    <>
      <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
        <WhiteBox cpn={<WorkFilterBox onSearch={onSearch} />} />
        {/* {isLogin ?  */}
        <MyWorkList />
        {/* : null} */}
        <h2>진행중인 채용공고</h2>
        <WorkListBox works={works} />
      </Box>
      {/* <Button>모집글 추가하는 버튼 우측 하단에 고정...!</Button> */}
    </>
  );
}
