import { styled, Button, Grid, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FilterDate, FilterArea, FilterStyle, FilterName } from './Filters';
import { useState } from 'react';
import { useEffect } from 'react';

const CustomButton = styled(Button)({
  variant: 'contained',
  width: '80%',
  color: '#FFFFFF',
  borderRadius: '62px',
  backgroundColor: '#FF7600',
  fontFamily: 'border',
  size: 'large',
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
  '&:active': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
});

export default function WorkFilterBox() {
  // 필터 정보가 있으면 filteredWorkList 호출

  const onSearch = () => {
    // '/api/job-offer/filter' 로 데이터 요청
  };

  // 이름 저장할 변수
  const [name, setName] = useState('');
  const onName = (imp) => {
    setName(imp.target.value);
  };

  // 지역 저장할 변수
  const [area, setArea] = useState('');
  const onArea = (imp) => {
    setArea(imp.target.value);
  };
  // 날짜 저장할 변수
  const [startDate, setStartDate] = useState('');
  const onStartDate = (imp) => {
    setStartDate(imp.$d.toISOString().split('T')[0]);
    console.log(imp.$d.toISOString().split('T')[0]);
  };

  // 스타일 저장할 변수
  const [styleTags, setStyleTags] = useState([]);
  const onStyleTags = (imp) => {
    //
    console.log('되나되나되나/?');
  };

  useEffect(() => {
    console.log(name, area, startDate, styleTags);
  }, [name, area, startDate, styleTags]);

  return (
    <Box sx={{ padding: '3vh', height: '100%' }}>
      <form>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item md={4}>
            <FilterName onName={onName} />
          </Grid>

          <Grid item md={4}>
            <FilterArea onArea={onArea} />
          </Grid>

          <Grid item md={4}>
            <FilterDate onStartDate={onStartDate} />
          </Grid>

          <Grid item md={7}>
            <FilterStyle onStyleTags={onStyleTags} />
          </Grid>

          <Grid item md={4}>
            <CustomButton startIcon={<SearchIcon />} onClick={onSearch}>
              조건 검색
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
