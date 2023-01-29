import { useState } from 'react';
import { Box, styled, TextField, Button, InputAdornment } from "@mui/material";
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

const CustomButton = styled(Button)({
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FF7600',
  },
});

export default function WorkFilterBox() {
  // 필터 정보 담을 변수필요
  // 필터 정보가 비어있으면 allWorkList 호출
  // 필터 정보가 있으면 filteredWorkList 호출
  const [selectDate, setSelectDate] = useState();
  const handleDate = (inIsland) => {
    setSelectDate(inIsland);
  };

  
  return (
    <Box
    sx={{
      width: '100%',
      height:'60vh',
      borderRadius: '39px',
      boxShadow: '0px 2px 15px 0px rgba(0,0,0,0.75)',
    }}>  
      <form
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '3vh 3vh 3vh 3vh',
      gap: '5vh',
      height: '23rem',
    }}
  >

      <CustomTextField
        label="선호하는 스타일"
        select

        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ color: '#FF7600' }}>
              <GroupsIcon />
            </InputAdornment>
          ),
        }}
      >
      </CustomTextField>

      <CustomTextField
        label="선호하는 지역"
        select
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ color: '#FF7600' }}>
              <FmdGoodOutlinedIcon />
            </InputAdornment>
          ),
        }}
      >
      </CustomTextField>

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

    <CustomTextField
      label="검색어로 찾기"
      placeholder="검색어를 입력하세요"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ color: '#FF7600' }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    >
      </CustomTextField>

      <CustomButton
        variant="contained"
        sx={{
          borderRadius: '62px',
          backgroundColor: '#FF7600',
          fontFamily: 'border',
        }}
        size="large"
        startIcon={<SearchIcon />}
        
      >
        조건 검색
      </CustomButton>

      </form>
    </ Box>
    
  );
}


