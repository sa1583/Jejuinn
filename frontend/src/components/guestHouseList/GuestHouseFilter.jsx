import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { FilterArea, FilterGuestHouseStyle } from '../work/Filters';

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
      borderRadius: '62px',
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

const CustomButton = styled(Button)({
  height: '6vh',
  '&:hover': {
    color: 'white',
    background: '#FF7600',
  },
});

export default function GuestHouseFilter({ handleFilter }) {
  const [guestHouseStyles, setGuestHouseStyles] = useState([]);
  const [selectedArea, setSelectedArea] = useState('전체');
  const [word, setWord] = useState('');

  const handleSetFilter = () => {
    handleFilter(selectedArea, 1, guestHouseStyles, word);
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '5vh 3vh 3vh 3vh',
        gap: '3vh',
        height: '21rem',
      }}
    >
      <FilterGuestHouseStyle
        value={guestHouseStyles}
        setValue={setGuestHouseStyles}
      />

      <FilterArea value={selectedArea} setValue={setSelectedArea} />

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
      <CustomButton
        variant="contained"
        sx={{
          marginTop: '1.5vh',
          borderRadius: '25px',
          backgroundColor: '#FF7600',
          fontFamily: 'border',
        }}
        size="large"
        startIcon={<SearchIcon />}
        onClick={handleSetFilter}
      >
        조건 검색
      </CustomButton>
    </form>
  );
}
