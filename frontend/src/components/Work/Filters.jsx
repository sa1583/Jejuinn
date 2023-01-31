import { useState } from 'react';
import Chip from '@mui/material/Chip';
import { Box, styled, TextField, Button, InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

function FilterArea() {
  return (
    <CustomTextField
      sx={{ width: '100%' }}
      label="선호하는 지역"
      select
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ color: '#FF7600' }}>
            <FmdGoodOutlinedIcon />
          </InputAdornment>
        ),
      }}
    ></CustomTextField>
  );
}

function FilterName() {
  return (
    <CustomTextField
      label="게스트하우스 이름"
      placeholder="검색어를 입력하세요"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ color: '#FF7600' }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    ></CustomTextField>
  );
}

function FilterDate() {
  const [selectDate, setSelectDate] = useState();
  const handleDate = (inIsland) => {
    setSelectDate(inIsland);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="입도가능날짜"
        value={selectDate}
        onChange={(newValue) => {
          handleDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

function FilterStyle() {
  return (
    <Autocomplete
      multiple
      options={wishStyles.map((option) => option)}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="스타일"
          placeholder="원하는 스타일을 입력하세요"
        />
      )}
    />
  );
}

export { FilterDate, FilterArea, FilterName, FilterStyle };

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const wishStyles = ['파티', '조용한', '술', '나혼자'];
