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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

function GetWorkName({ handleWorkInfo }) {
  const [workName, setWorkName] = useState('');
  const onInput = (event) => {
    handleWorkInfo(event);
    setWorkName(event.target.value);
  };

  return (
    <CustomTextField
      label="직무명"
      name="workName"
      value={workName}
      onInput={onInput}
      variant="standard"
      sx={{
        width: '50%',
      }}
    />
  );
}

function GetWorkSalary({ handleWorkInfo }) {
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

function GetWorkGender({ handleWorkInfo }) {
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
      value={gender}
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

function GetWorkPeriod({ handleWorkInfo }) {
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
        value={minWorkPeriod}
        onInput={handelOnInput}
      />
    </Box>
  );
}

function GetWorkIntake({ handleWorkInfo }) {
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
        onInput={handelOnInput}
      />
    </Box>
  );
}

function GetWorkWorkDays({ handleWorkInfo }) {
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
      value={workDays}
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

function GetWorkDaysOff({ handleWorkInfo }) {
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
      value={daysOff}
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

function GetWorkDescription({ handleWorkInfo }) {
  const [workDescription, setWorkDescription] = useState('');
  const onInput = (event) => {
    handleWorkInfo(event);
    setWorkDescription(event.target.value);
  };

  return (
    <CustomTextField
      label="직무 상세 설명"
      name="workDescription"
      value={workDescription}
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

function GetRecruitmentTitle({ onTitle }) {
  return <CustomTextField label="채용 공고 제목" onInput={onTitle} />;
}

function GetRecruitmentWelfare({ onWelfare }) {
  return <CustomTextField label="복지" onInput={onWelfare} />;
}

function GetRecruitmentInfo({ onAddInfo }) {
  return <CustomTextField label="추가정보" onInput={onAddInfo} />;
}

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

function GetRecruitmentPersontype({ onPersontype }) {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      multiple
      limitTags={3}
      options={selectedPersontypes.map((option) => option)}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        onPersontype(newValue);
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
  // onWrite 상태 바꾸고

  //

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function onClick(input) {
    dispatch(changeIsOnWrite());
    console.log(input.target.value);
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
              {myGuestHouse.uid}
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
  GetRecruitmentInfo,
  GetRecruitmentWelfare,
  GetRecruitmentTitle,
  GetRecruitmentPersontype,
  SelectGusetHousePopover,
};
