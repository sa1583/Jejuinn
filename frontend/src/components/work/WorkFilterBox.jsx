import { styled, Button, Grid, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FilterDate, FilterArea, FilterStyle, FilterName } from './Filters';
import { useState } from 'react';
import { useEffect } from 'react';
import { filteredWorkList } from '../../api/work';

const CustomButton = styled(Button)({
  variant: 'contained',
  width: '100%',
  height: '7vh',
  color: '#FFFFFF',
  borderRadius: '62px',
  backgroundColor: '#FF7600',
  fontFamily: 'border',
  size: 'large',
  '&:hover': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
  '&:active': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
});

export default function WorkFilterBox({ onSearch }) {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [startDate, setStartDate] = useState('');
  const [styleTags, setStyleTags] = useState([]);
  const [filterValue, setFilterValue] = useState([]);

  const onClick = () => {
    setFilterValue({ name, area, startDate, styleTags });
  };
  // useEffect(() => {
  //   onSearch(filterValue);
  // }, [filterValue]);

  const onName = (imp) => {
    setName(imp.target.value);
  };
  const onArea = (imp) => {
    setArea(imp.target.value);
  };
  const onStartDate = (imp) => {
    setStartDate(imp.$d.toISOString().split('T')[0]);
  };
  const onStyleTags = (imp) => {
    setStyleTags(imp);
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
            <CustomButton startIcon={<SearchIcon />} onClick={onClick}>
              조건 검색
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
