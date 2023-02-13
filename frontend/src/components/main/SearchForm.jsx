import * as React from 'react';
import { useState } from 'react';
import { Box, styled, TextField, Button, InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function SearchForm() {
  const [selectDate, setSelectDate] = useState(null);
  const handleDate = (inIsland) => {
    setSelectDate(inIsland);
  };

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

  return (
    <form
      action=""
      style={{
        width: '67%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '6h',
      }}
    >
      <Box
        sx={{
          padding: '3%',
          borderRadius: 3,
          backgroundColor: 'white',
        }}
        boxShadow="0px 2px 74px 2px rgba(0, 0, 0, 0.1)"
      >
        <Stack spacing={3}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={[
              '조용한 게하',
              '파티가 있는 게하',
              '수영장이 있는 게하',
              '뷰가 좋은 게하',
            ]}
            filterSelectedOptions
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="선호하는 스타일"
                placeholder="원하는 스타일을 입력하세요"
              />
            )}
          />
        </Stack>
        <Box sx={{ display: 'flex' }}>
          <Stack
            spacing={3}
            sx={{ width: 400, marginTop: '2vh', marginRight: '1vh' }}
          >
            <Autocomplete
              multiple
              id="tags-outlined"
              options={['북부', '서부', '남부', '동부']}
              filterSelectedOptions
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  label="선호하는 지역"
                  placeholder="선호하는 지역을 입력하세요"
                />
              )}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: '#FF7600' }}>
                    <FmdGoodOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={3} sx={{ width: 400, marginTop: '2vh' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="입도가능날짜"
                value={selectDate}
                onChange={(newValue) => {
                  handleDate(newValue);
                }}
                renderInput={(params) => <CustomTextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </Box>
      </Box>
      <Button
        sx={{
          height: '7vh',
          background: '#FF7600',
          borderRadius: '9px',
          color: 'white',
          '&:hover': {
            color: 'white',
            background: '#FF7600',
          },
          border: 'none',
          fontSize: '1.8vh',
          marginTop: '2vh',
        }}
        startIcon={<SearchIcon />}
      >
        나에게 꼭 맞는 게스트하우스 찾기
      </Button>
    </form>
  );
}
