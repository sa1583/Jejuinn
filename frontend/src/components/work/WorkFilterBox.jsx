import { styled, Button, Grid, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FilterDate, FilterArea, FilterGuestHouseStyle } from './Filters';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';

const CustomButton = styled(Button)({
  variant: 'contained',
  width: '100%',
  height: '7vh',
  color: '#FFFFFF',
  borderRadius: '62px',
  backgroundColor: '#FF7600',
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

const CustomTextField = styled(TextField)({
  '& label': {
    color: '#000000',
    marginTop: '2px',
  },
  '& label.Mui-focused': {
    color: '#FF7600',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d1d1d1',
      opacity: '83%',
      height: '6vh',
      borderRadius: '20px',
      margin: 'auto',
    },
    '&:hover fieldset': {
      borderColor: '#FF7600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7600',
    },
  },
});

export default function WorkFilterBox({ handleFilter }) {
  const [selectedArea, setSelectedArea] = useState('전체');
  const [word, setWord] = useState('');
  const [startDate, setStartDate] = useState('');
  const [styleTags, setStyleTags] = useState([]);

  const handleSetFilter = () => {
    handleFilter(selectedArea, 1, styleTags, startDate, word);
  };

  return (
    <Box sx={{ padding: '3vh', height: '100%' }}>
      <form>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item md={4}>
            <CustomTextField
              label="검색어로 찾기"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: '#FF7600' }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="검색어를 입력하세요"
            />
          </Grid>

          <Grid item md={4}>
            <FilterArea value={selectedArea} setValue={setSelectedArea} />
          </Grid>

          <Grid item md={4}>
            <FilterDate value={startDate} setValue={setStartDate} />
          </Grid>

          <Grid item md={7}>
            <FilterGuestHouseStyle value={styleTags} setValue={setStyleTags} />
          </Grid>

          <Grid item md={4}>
            <CustomButton startIcon={<SearchIcon />} onClick={handleSetFilter}>
              조건 검색
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
