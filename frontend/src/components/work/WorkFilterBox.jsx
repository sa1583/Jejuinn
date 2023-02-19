import { styled, Button, Grid, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FilterDate, FilterArea, FilterGuestHouseStyle } from './Filters';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';

const CustomButton = styled(Button)({
  width: '100%',
  height: '6vh',
  '&:hover': {
    color: 'white',
    background: '#FF7600',
  },
});

const CustomTextField = styled(TextField)({
  width: '100%',
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
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={8}>
            <FilterGuestHouseStyle value={styleTags} setValue={setStyleTags} />
          </Grid>

          <Grid item xs={4}>
            <FilterArea value={selectedArea} setValue={setSelectedArea} />
          </Grid>

          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <FilterDate value={startDate} setValue={setStartDate} />
          </Grid>

          <Grid item md={12}>
            <CustomButton
              variant="contained"
              sx={{
                // marginTop: 'vh',
                borderRadius: '20px',
                backgroundColor: '#FF7600',
                marginBottom: '1vh',
              }}
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleSetFilter}
            >
              조건 검색
            </CustomButton>
            {/* <CustomButton startIcon={<SearchIcon />} onClick={handleSetFilter}>
              조건 검색
            </CustomButton> */}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
