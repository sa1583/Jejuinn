import {
  styled,
  TextField,
  InputAdornment,
  MenuItem,
  Stack,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/system';

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

const selectedGenders = ['여자', '남자', '무관'];
const selectedDays = [1, 2, 3, 4, 5];

function GetWorkName() {
  return <CustomTextField label="직무명" />;
}

function GetWorkSalary() {
  return <CustomTextField label="급여" />;
}
function GetWorkGender() {
  return (
    <CustomTextField sx={{ width: '100%' }} label="성별" select>
      {selectedGenders.map((selectedGender) => (
        <MenuItem key={uuidv4()} value={selectedGender}>
          {selectedGender}
        </MenuItem>
      ))}
    </CustomTextField>
  );
}

function GetWorkPeriod() {
  return (
    <Box sx={{ width: '40%' }}>
      <CustomTextField label="최소근무기간(개월)" type="number" />
    </Box>
  );
}

function GetWorkIntake() {
  return (
    <Box sx={{ width: '40%' }}>
      <CustomTextField label="채용인원" type="number" />
    </Box>
  );
}

function GetWorkWorkDays() {
  return (
    <CustomTextField label="" type="number" select>
      {selectedDays.map((selectedDay) => (
        <MenuItem key={uuidv4()} value={selectedDay}>
          {selectedDay}
        </MenuItem>
      ))}
    </CustomTextField>
  );
}

function GetWorkDaysOff() {
  return (
    <CustomTextField label="" type="number" select>
      {selectedDays.map((selectedDay) => (
        <MenuItem key={uuidv4()} value={selectedDay}>
          {selectedDay}
        </MenuItem>
      ))}
    </CustomTextField>
  );
}

function GetWorkStartTime() {
  const [value, setValue] = useState(dayjs('2018-01-01T00:00:00.000Z'));
  return (
    <Box sx={{ width: '40%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <TimePicker
            value={value}
            onChange={setValue}
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
    </Box>
  );
}

function GetWorkEndTime() {
  const [value, setValue] = useState(dayjs('2018-01-01T00:00:00.000Z'));
  return (
    <Box sx={{ width: '40%' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <TimePicker
            value={value}
            onChange={setValue}
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
    </Box>
  );
}

function GetRecruitmentTitle() {
  return <CustomTextField label="채용 공고 제목" />;
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
  GetRecruitmentTitle,
};
