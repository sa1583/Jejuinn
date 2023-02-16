import { styled, TextField, InputAdornment, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GroupsIcon from '@mui/icons-material/Groups';
import dayjs from 'dayjs';
import { useEffect } from 'react';

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
      height: '100%',
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

function FilterName({ value, setValue }) {
  return (
    <CustomTextField
      label="게스트하우스 이름"
      placeholder="입력"
      onInput={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
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

function FilterArea({ value, setValue }) {
  const areas = [
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

  useEffect(() => {
    if (!value || value === '') setValue('전체');
  }, [value]);

  return (
    <Autocomplete
      sx={{ width: '100%' }}
      options={areas}
      defaultValue="전체"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="선호하는 지역"
          // placeholder="선호하는 지역을 선택하세요"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <FmdGoodOutlinedIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

function FilterDate({ value, setValue }) {
  const handelOnChange = (event) => {
    const dateFormat = dayjs(event.$d.toString()).format('YYYY-MM-DD');
    setValue(dateFormat);
  };

  useEffect(() => {
    const defaultValue = new Date();
    setValue(dayjs(defaultValue).format('YYYY-MM-DD'));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="입도가능날짜"
        value={value}
        inputFormat="YYYY-MM-DD"
        mask={'____-__-__'}
        onChange={(newValue) => {
          handelOnChange(newValue);
        }}
        renderInput={(params) => (
          <CustomTextField {...params} sx={{ width: '100%' }} />
        )}
      />
    </LocalizationProvider>
  );
}

function FilterStyle({ value, setValue }) {
  const wishStyles = [
    '꼼꼼',
    '대처 능력',
    '빠른 습득',
    '빠른 일처리',
    '스탭 경험자',
    '아침형 인간',
    '열정',
    '의사소통 기술',
    '저녁형 인간',
    '책임감',
    '친절함',
    '활발한 성격',
  ];

  const maxSelections = 5;
  return (
    <Autocomplete
      sx={{ width: '100%' }}
      multiple
      limitTags={3}
      getOptionDisabled={(option) =>
        value.length === maxSelections || value.includes(option) ? true : false
      }
      options={wishStyles}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
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

function FilterGuestHouseStyle({ value, setValue }) {
  const wishStyles = [
    '파티',
    '오션뷰',
    '조용한 게하',
    '재밌는 게하',
    '교통 편리',
    '픽업 가능',
    '꿀잼',
    '서핑 가능',
    '깨끗한 게하',
    '마운틴뷰',
    '여성 전용',
    '댕댕이 보유',
    '냥냥이 보유',
    '이색동물 보유',
    '힐링',
    '늦은 체크아웃',
    '빠른 체크인',
  ];

  const maxSelections = 5;

  return (
    <Autocomplete
      sx={{ width: '100%' }}
      multiple
      limitTags={3}
      options={wishStyles}
      getOptionDisabled={(option) =>
        value.length === maxSelections || value.includes(option) ? true : false
      }
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="스타일"
          placeholder="원하는 스타일을 선택하세요"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <InputAdornment position="start">
                  <GroupsIcon color="primary" />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export {
  FilterDate,
  FilterArea,
  FilterName,
  FilterStyle,
  FilterGuestHouseStyle,
};
