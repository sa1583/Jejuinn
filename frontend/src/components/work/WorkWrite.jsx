import { Grid, Box } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import {
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
} from './WorkWriteForms';

export default function WorkWrite({ onWorkWrite }) {
  const [workInfo, setWorkInfo] = useState({
    workName: '',
    gender: '',
    salary: '',
    workTime: '',
    workDescription: '',
    intake: 0,
    workDays: 2,
    daysOff: 2,
    minWorkPeriod: 0,
  });

  const handleWorkInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    ['daysOff', 'intake', 'minWorkPeriod', 'workDays'].includes(name)
      ? setWorkInfo({ ...workInfo, [name]: parseInt(value) })
      : setWorkInfo({ ...workInfo, [name]: value });
  };

  const [workStartTime, setWorkStartTime] = useState('09:00');
  const [workEndTime, setWorkEndTime] = useState('15:00');
  const onWorkStartTime = (imp) => {
    setWorkStartTime(imp);
  };
  const onWorkEndTime = (imp) => {
    setWorkEndTime(imp);
  };
  useEffect(() => {
    setWorkInfo({ ...workInfo, workTime: `${workStartTime}~${workEndTime}` });
  }, [workEndTime, workStartTime]);

  useEffect(() => {
    onWorkWrite(workInfo);
  }, [workInfo]);

  return (
    <Box sx={{ paddingTop: '1rem', height: '100%' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <GetWorkName handleWorkInfo={handleWorkInfo} />
          </Grid>

          <Grid item md={6}>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <GetWorkWorkDays handleWorkInfo={handleWorkInfo} />일 근무
                <GetWorkDaysOff handleWorkInfo={handleWorkInfo} />일 휴무
              </Grid>
              <Grid item md={12}>
                <GetWorkGender handleWorkInfo={handleWorkInfo} />
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  <GetWorkIntake handleWorkInfo={handleWorkInfo} />
                  <GetWorkPeriod handleWorkInfo={handleWorkInfo} />
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  <Grid item md={5}>
                    <GetWorkStartTime onWorkStartTime={onWorkStartTime} />
                  </Grid>
                  <Grid item md={2}>
                    ~
                  </Grid>
                  <Grid item md={5}>
                    <GetWorkEndTime onWorkEndTime={onWorkEndTime} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <GetWorkSalary handleWorkInfo={handleWorkInfo} />
              </Grid>
              <Grid item md={12}>
                <GetWorkDescription handleWorkInfo={handleWorkInfo} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
