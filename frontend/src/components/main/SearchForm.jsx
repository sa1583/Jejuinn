import * as React from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchForm() {
  return (
    <Box
      sx={{
        width: 480,
        height: 400,
        borderRadius: 8,
      }}
      boxShadow="0px 2px 74px 2px rgba(0, 0, 0, 0.1)"
    >
      <form
        action=""
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '6h',
        }}
      >
        <Stack spacing={3} sx={{ width: 400, marginTop: '5vh' }}>
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
              <TextField
                {...params}
                label="선호하는 스타일"
                placeholder="선호하는 스타일"
              />
            )}
          />
        </Stack>
        <Stack spacing={3} sx={{ width: 400, marginTop: '2vh' }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={['북부', '서부', '남부', '동부']}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="선호하는 지역"
                placeholder="선호하는 지역"
              />
            )}
          />
        </Stack>
        <Stack spacing={3} sx={{ width: 400, marginTop: '2vh' }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={['2023-01-25', '2023-01-26', '2023-01-27', '2023-01-28']}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="입도 가능 날짜"
                placeholder="2023-01-25"
              />
            )}
          />
        </Stack>
        <Button
          sx={{
            width: '400px',
            height: '7vh',
            background: '#FF7600',
            borderRadius: '23px',
            color: 'white',
            '&:hover': {
              color: 'white',
              background: '#FF7600',
            },
            border: 'none',
            fontSize: '1.8vh',
            marginTop: '4vh',
          }}
          startIcon={<SearchIcon />}
        >
          나에게 꼭 맞는 게스트하우스 찾기
        </Button>
      </form>
    </Box>
  );
}
