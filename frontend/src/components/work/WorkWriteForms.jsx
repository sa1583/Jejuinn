import {
  styled,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Button,
  Popover,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { changeIsOnWrite, selectIsOnWrite } from '../../store/work';

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

// 직무 입력

const selectedGenders = ['여자', '남자', '무관'];
const selectedDays = [1, 2, 3, 4, 5];

function GetWorkName({ handleWorkInfo, preValue }) {
  const [workName, setWorkName] = useState(preValue);
  const onInput = (event) => {
    handleWorkInfo(event);
    setWorkName(event.target.value);
  };

  return (
    <CustomTextField
      label="직무명"
      name="workName"
      value={preValue}
      onInput={onInput}
      variant="standard"
      sx={{
        width: '50%',
      }}
    />
  );
}

function GetWorkSalary({ handleWorkInfo, preValue }) {
  const [workSalary, setWorkSalary] = useState('');
  const onInput = (event) => {
    handleWorkInfo(event);
    setWorkSalary(event.target.value);
  };

  return (
    <CustomTextField
      label="급여"
      placeholder="급여조건을 입력해 주세요"
      name="salary"
      value={workSalary}
      onInput={onInput}
      sx={{
        width: '100%',
      }}
    />
  );
}

function GetWorkGender({ handleWorkInfo, preValue }) {
  const [gender, setGender] = useState('');
  const handelOnChange = (event) => {
    setGender(event.target.value);
    handleWorkInfo(event);
  };
  return (
    <CustomTextField
      sx={{ width: '100%' }}
      label="성별"
      select
      name="gender"
      value={preValue}
      onChange={handelOnChange}
    >
      {selectedGenders.map((selectedGender) => (
        <MenuItem key={uuidv4()} value={selectedGender}>
          {selectedGender}
        </MenuItem>
      ))}
    </CustomTextField>
  );
}

function GetWorkPeriod({ handleWorkInfo, preValue }) {
  const [minWorkPeriod, setMinWorkPeriod] = useState(0);
  const handelOnInput = (event) => {
    setMinWorkPeriod(event.target.value);
    handleWorkInfo(event);
  };
  return (
    <Box sx={{ width: '40%' }}>
      <CustomTextField
        label="최소근무기간(개월)"
        type="number"
        name="minWorkPeriod"
        value={preValue}
        onInput={handelOnInput}
      />
    </Box>
  );
}

function GetWorkIntake({ handleWorkInfo, preValue }) {
  const [intake, setIntake] = useState(0);
  const handelOnInput = (event) => {
    setIntake(event.target.value);
    handleWorkInfo(event);
  };
  return (
    <Box sx={{ width: '40%' }}>
      <CustomTextField
        label="채용인원"
        type="number"
        name="intake"
        value={preValue}
        onInput={handelOnInput}
      />
    </Box>
  );
}

function GetWorkWorkDays({ handleWorkInfo, preValue }) {
  const [workDays, setWorkDays] = useState(2);
  const handelOnChange = (event) => {
    setWorkDays(event.target.value);
    handleWorkInfo(event);
  };

  return (
    <CustomTextField
      label=""
      type="number"
      select
      value={preValue}
      name="workDays"
      onChange={handelOnChange}
      sx={{
        width: '6vh',
      }}
    >
      {selectedDays.map((selectedDay) => (
        <MenuItem key={uuidv4()} value={selectedDay}>
          {selectedDay}
        </MenuItem>
      ))}
    </CustomTextField>
  );
}

function GetWorkDaysOff({ handleWorkInfo, preValue }) {
  const [daysOff, setDaysOff] = useState(2);
  const handelOnChange = (event) => {
    setDaysOff(event.target.value);
    handleWorkInfo(event);
  };
  return (
    <CustomTextField
      label=""
      type="number"
      select
      value={preValue}
      name="daysOff"
      onChange={handelOnChange}
      sx={{
        width: '6vh',
      }}
    >
      {selectedDays.map((selectedDay) => (
        <MenuItem key={uuidv4()} value={selectedDay}>
          {selectedDay}
        </MenuItem>
      ))}
    </CustomTextField>
  );
}

function GetWorkStartTime({ onWorkStartTime }) {
  const [startTime, setStartTime] = useState(dayjs('2018-01-01T00:00:00.000Z'));
  const handelOnChange = (event) => {
    const hour = event.$d.toTimeString().split(':')[0];
    const minute = event.$d.toTimeString().split(':')[1].split(':')[0];
    setStartTime(event.$d.getTime());
    onWorkStartTime(`${hour}:${minute}`);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          value={startTime}
          onChange={handelOnChange}
          renderInput={(params) => <TextField {...params} />}
          shouldDisableTime={(timeValue, clockType) => {
            if (clockType === 'minutes' && timeValue % 5) {
              return true;
            }

            return false;
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}

function GetWorkEndTime({ onWorkEndTime }) {
  const [endTime, setEndTime] = useState(dayjs('2018-01-01T00:00:00.000Z'));
  const handelOnChange = (event) => {
    const hour = event.$d.toTimeString().split(':')[0];
    const minute = event.$d.toTimeString().split(':')[1].split(':')[0];
    setEndTime(event.$d.getTime());
    onWorkEndTime(`${hour}:${minute}`);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <TimePicker
          value={endTime}
          onChange={handelOnChange}
          renderInput={(params) => <TextField {...params} />}
          shouldDisableTime={(timeValue, clockType) => {
            if (clockType === 'minutes' && timeValue % 5) {
              return true;
            }

            return false;
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}

function GetWorkDescription({ handleWorkInfo, preValue }) {
  const [workDescription, setWorkDescription] = useState('');
  const onInput = (event) => {
    handleWorkInfo(event);
    setWorkDescription(event.target.value);
  };

  return (
    <CustomTextField
      label="직무 상세 설명"
      name="workDescription"
      value={preValue}
      onInput={onInput}
      multiline
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          height: '20vh',
          '& fieldset': {
            borderRadius: '30px',
          },
        },
      }}
    />
  );
}

function GetWorkEntryDate({ onWorkEntryDate, preValue }) {
  const [value, setValue] = useState('');
  const handelOnChange = (event) => {
    const entryDate = event.$d.toISOString().split('T')[0];
    setValue(event.$d.toISOString().split('T')[0]);
    onWorkEntryDate(entryDate);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="입도가능날짜"
        value={preValue}
        name="entryDate"
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

// 채용공고 입력

function GetRecruitmentTitle({ handleRecruimentInfo, preValue }) {
  const [recruitmentTitle, setRecruitmentTitle] = useState(preValue);
  const onInput = (event) => {
    handleRecruimentInfo(event);
    setRecruitmentTitle(event.target.value);
  };
  return (
    <CustomTextField
      label="채용 공고 제목"
      name="title"
      onInput={onInput}
      value={preValue}
      variant="standard"
      sx={{
        width: '100%',
      }}
    />
  );
}

function GetRecruitmentWelfare({ handleRecruimentInfo, preValue }) {
  const [recruitmentWelfare, setRecruitmentWelfare] = useState(preValue);
  const onInput = (event) => {
    handleRecruimentInfo(event);
    setRecruitmentWelfare(event.target.value);
  };
  return (
    <CustomTextField
      label="복지"
      name="welfare"
      onInput={onInput}
      value={preValue}
      sx={{
        width: '100%',
      }}
    />
  );
}

function GetRecruitmentInfo({ handleRecruimentInfo, preValue }) {
  const [recruitmentInfo, setRecruitmentInfo] = useState(preValue);
  const onInput = (event) => {
    handleRecruimentInfo(event);
    setRecruitmentInfo(event.target.value);
  };
  return (
    <CustomTextField
      label="추가정보"
      name="addInfo"
      multiline
      onInput={onInput}
      value={preValue}
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          height: '20vh',
          '& fieldset': {
            borderRadius: '30px',
          },
        },
      }}
    />
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

  return (
    <Autocomplete
      sx={{ width: '100%' }}
      multiple
      limitTags={3}
      options={wishStyles.map((option) => option)}
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

function GetRecruitmentWanted({ onWanted }) {
  const selectedPersontypes = [
    '스탭 경험자',
    '활발한 성격',
    '책임감',
    '꼼꼼',
    '의사소통 기술',
    '친절함',
    '아침형 인간',
    '저녁형 인간',
    '빠른 습득',
    '열정',
    '대처능력',
    '빠른 일처리 ',
  ];
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      multiple
      limitTags={3}
      options={selectedPersontypes.map((option) => option)}
      value={value}
      name="persontype"
      onChange={(event, newValue) => {
        setValue(newValue);
        onWanted(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="인재상"
          placeholder="원하는 인재상을 입력하세요"
        />
      )}
    />
  );
}

// 게하 여러개 일 때 직무 추가할 게스트하우스 선택하는 팝오버
function SelectGusetHousePopover({ myGuestHouses, onSelect }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function onClick(input) {
    dispatch(changeIsOnWrite());
    onSelect(input.target.value);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button onClick={handleClick}>+</Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          어떤 게스트하우스에 직무를 추가할까요?
          {myGuestHouses.map((myGuestHouse) => (
            <Button onClick={onClick} value={myGuestHouse.uid} key={uuidv4()}>
              {myGuestHouse.guestHouseName}
            </Button>
          ))}
        </Typography>
      </Popover>
    </div>
  );
}

export {
  GetWorkName,
  GetWorkGender,
  GetWorkSalary,
  GetWorkPeriod,
  GetWorkIntake,
  GetWorkWorkDays,
  GetWorkDaysOff,
  GetWorkStartTime,
  GetWorkEndTime,
  GetWorkDescription,
  GetWorkEntryDate,
  GetRecruitmentInfo,
  GetRecruitmentWelfare,
  GetRecruitmentTitle,
  GetRecruitmentWanted,
  SelectGusetHousePopover,
};
