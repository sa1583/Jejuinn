import { Grid, Box, styled, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { useLocation, useNavigate, useParams } from 'react-router';
import { selectAccessToken, selectUserInfo } from '../../store/user';
import {
  GetWorkEntryDate,
  GetWorkTime,
  GetWorkOptions,
} from './WorkWriteForms';

// api 들..

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

export default function WorkCreateForm() {
  // const accessToken = useSelector(selectAccessToken);
  // const userInfo = useSelector(selectUserInfo);
  // const navigate = useNavigate();

  const [isCreate, setIsCreate] = useState();
  const [postUid, setPostUid] = useState();

  const [workName, setWorkName] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [intake, setIntake] = useState(1);
  const [workDays, setWorkDays] = useState(2);
  const [daysOff, setDaysOff] = useState(2);
  const [minWorkPeriod, setMinWorkPeriod] = useState(1);
  const [entryDate, setEntryDate] = useState('');

  const [workStartTime, setWorkStartTime] = useState(
    dayjs('2018-01-01T00:00:00.000Z'),
  );
  const [workEndTime, setWorkEndTime] = useState(
    dayjs('2018-01-01T06:00:00.000Z'),
  );
  useEffect(() => {
    setWorkTime(`${workStartTime}~${workEndTime}`);
  }, [workEndTime, workStartTime]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split('/')[2] === 'create') {
      setIsCreate(true);
    } else {
      setIsCreate(false);
      setPostUid(location.pathname.split('/')[3]);
    }
  }, []);

  // 이전직무 조회하는 api 만들어 달라해야함..
  // const getWorkInfo = async () => {
  //    const { data } = await workDetail(postUid);
  //    setWorkName(data.work.workName)
  //    setGender(data.work.gender)
  //    setSalary(data.work.salary)
  //    setWorkTime(data.work.workTime)
  //    setWorkDescription(data.work.workDescription)
  //    setIntake(data.work.intake)
  //    setWorkDays(data.work.workDays)
  //    setDaysOff(data.work.daysOff)
  //    setMinWorkPeriod(data.work.)
  //    setEntryDate(data.work.minWorkPeriod)};

  useEffect(() => {
    if (postUid) {
      // getWorkInfo();
    }
  }, [postUid]);

  return (
    <Box sx={{ paddingTop: '1rem', height: '100%' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <CustomTextField
              label="직무명"
              placeholder="필요한 직무명을 입력해 주세요"
              value={workName}
              onChange={(e) => setWorkName(e.target.value)}
              variant="standard"
              sx={{
                width: '50%',
              }}
            />
          </Grid>

          <Grid item md={6}>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <GetWorkOptions
                  value={workDays}
                  setValue={setWorkDays}
                  options={[1, 2, 3, 4, 5]}
                />
              </Grid>
              <Grid item md={2}>
                일 근무
              </Grid>
              <Grid item md={4}>
                <GetWorkOptions
                  value={daysOff}
                  setValue={setDaysOff}
                  options={[1, 2, 3, 4, 5]}
                />
              </Grid>
              <Grid item md={2}>
                일 휴무
              </Grid>
              <Grid item md={12}>
                <GetWorkOptions
                  sx={{ width: '50%' }}
                  value={gender}
                  setValue={setGender}
                  options={['여자', '남자', '무관']}
                  label="성별"
                />
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  <CustomTextField
                    sx={{ width: '40%' }}
                    label="채용인원"
                    type="number"
                    value={intake}
                    onChange={(e) => setIntake(parseInt(e.target.value))}
                  />
                  <CustomTextField
                    sx={{ width: '40%' }}
                    label="최소근무기간(개월)"
                    type="number"
                    value={minWorkPeriod}
                    onChange={(e) => setMinWorkPeriod(parseInt(e.target.value))}
                  />
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  <Grid item md={5}>
                    <GetWorkTime
                      value={workStartTime}
                      setValue={setWorkStartTime}
                    />
                  </Grid>
                  <Grid item md={2}>
                    ~
                  </Grid>

                  <Grid item md={5}>
                    <GetWorkTime
                      value={workEndTime}
                      setValue={setWorkEndTime}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <GetWorkEntryDate value={entryDate} setValue={setEntryDate} />
              </Grid>
              <Grid item md={12}>
                <CustomTextField
                  label="급여"
                  placeholder="급여조건을 입력하세요"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <CustomTextField
                  multiline
                  label="직무상세"
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
