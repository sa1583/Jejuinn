import WorkFilterBox from '../../components/work/WorkFilterBox';
import { allWorkList, filterWorks } from '../../api/work';
import WorkListBox from '../../components/work/WorkListBox';
import { Box } from '@mui/material';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useEffect, useState } from 'react';
import MyWorkList from '../../components/work/MyWorkList';
import { selectIsLogin } from '../../store/user';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export default function WorkList() {
  const isLogin = useSelector(selectIsLogin);
  const [works, setWorks] = useState([]);

  async function getWorks() {
    const { data } = await filterWorks(filter);
    if (filter.pageNumber === 1) setWorks(data.content);
    else setWorks((prev) => prev.concat(data.content));
  }
  const defaultDate = new Date();
  const startDate = dayjs(defaultDate.toString()).format('YYYY-MM-DD');

  const [filter, setFilter] = useState({
    word: '',
    selectedArea: '전체',
    startDate: startDate,
    styleTags: [],
    pageNumber: 1,
  });

  // const myhouse = useSelector();

  const onSearch = (selectedArea, pageNumber, styleTags, startDate, word) => {
    setFilter({ selectedArea, pageNumber, styleTags, startDate, word });
  };

  useEffect(() => {
    getWorks();
  }, [filter]);

  return (
    <>
      <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
        <WhiteBox cpn={<WorkFilterBox handleFilter={onSearch} />} />
        {isLogin ? <MyWorkList /> : null}
        <h2>진행중인 채용공고</h2>
        <WorkListBox works={works} />
      </Box>
    </>
  );
}
