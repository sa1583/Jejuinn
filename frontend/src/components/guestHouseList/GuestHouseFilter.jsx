import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
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

export default function GuestHouseFilter({ getFilter, filter }) {
  const selectedStyles = [
    '전체',
    '조용한 게하',
    '파티가 있는 게하',
    '수영장이 있는 게하',
    '뷰가 좋은 게하',
  ];
  const selectedSections = [
    '전체',
    '서귀포시',
    '제주시',
    '한경면',
    '한림읍',
    '애월읍',
    '조천읍',
    '구좌읍',
    '성산읍',
    '표선면',
    '남원읍',
    '안덕면',
    '대정읍',
    '우도면',
  ];

  const [pickForm, setPickForm] = useState(filter);
  const [guestHouseStyles, setGuestHouseStyles] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const handlePickForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPickForm({ ...pickForm, [name]: value });
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

      <FilterArea value={selectedAreas} setValue={setSelectedAreas} />

      <CustomTextField
        label="검색어로 찾기"
        name="inp"
        value={pickForm.inp}
        onChange={handlePickForm}
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
        onClick={(e) => {
          e.preventDefault();
          getFilter(pickForm);
        }}
      >
        조건 검색
      </CustomButton>
    </form>
  );
}
