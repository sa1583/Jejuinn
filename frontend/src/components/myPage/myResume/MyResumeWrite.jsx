import { Box, Grid, styled, Button, TextField } from '@mui/material';
import { FilterDate, FilterArea, FilterStyle } from '../../work/Filters';
import { useState } from 'react';
import { useEffect } from 'react';

const CustomButton = styled(Button)({
  border: '1px solid #FF7600',
  variant: 'outlined',
  color: '#FF7600',
  width: '70%',
  borderRadius: '62px',
  fontFamily: 'border',
  height: '5vh',
  '&:hover': {
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    backgroundColor: '#FF7600',
  },
});

export default function MyResumeWrite({ changeApplyComp }) {
  const [area, setArea] = useState('');
  const [startDate, setStartDate] = useState('');
  const [styleTags, setStyleTags] = useState([]);
  const [intro, setIntro] = useState('');
  // twoCalls 사용해서

  const writeArea = (imp) => {
    setArea(imp.target.value);
  };
  const writeStyleTags = (imp) => {
    setStyleTags(imp);
  };
  const writeStartDate = (imp) => {
    setStartDate(imp.$d.toISOString().split('T')[0]);
  };
  const writeIntro = (imp) => {
    setIntro(imp.target.value);
  };
  const submitResume = () => {};

  useEffect(() => {
    console.log(area, styleTags, startDate, intro);
  }, [area, styleTags, startDate, intro]);
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item md={4}>
            선호하는 스타일
          </Grid>
          <Grid item md={8}>
            <FilterStyle onStyleTags={writeStyleTags} />
          </Grid>

          <Grid item md={4}>
            선호 지역
          </Grid>
          <Grid item md={8}>
            <FilterArea onArea={writeArea} />
          </Grid>

          <Grid item md={4}>
            입도 가능일
          </Grid>
          <Grid item md={8}>
            <FilterDate onStartDate={writeStartDate} />
          </Grid>

          <Grid item md={4}>
            자기소개
          </Grid>
          <Grid item md={8}>
            <TextField onChange={writeIntro} />
          </Grid>
          <CustomButton onClick={changeApplyComp} onSubmit={submitResume}>
            지원서 저장
          </CustomButton>
        </Grid>
      </form>
    </Box>
  );
}
