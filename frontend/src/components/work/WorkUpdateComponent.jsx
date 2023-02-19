import { Grid, Box, styled, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import { updateWork } from '../../api/work';
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
  GetWorkEntryDate,
} from './WorkWriteForms';

const CustomButton = styled(Button)({
  variant: 'contained',
  width: '100%',
  height: '7vh',
  color: '#FFFFFF',
  borderRadius: '62px',
  backgroundColor: '#FF7600',
  fontFamily: 'border',
  size: 'large',
  '&:hover': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
  '&:active': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
});

export default function WorkUpdateComponent({ prework, onWorkWrite }) {
  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();

  const [workInfo, setWorkInfo] = useState({
    workName: '',
    gender: '',
    salary: '',
    workTime: '',
    workDescription: '',
    intake: '',
    workDays: 2,
    daysOff: 2,
    minWorkPeriod: '',
    entryDate: '',
    recruitmentUid: recruitmentUid,
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

  const onWorkEntryDate = (input) => {
    setWorkInfo({ ...workInfo, entryDate: `${input}` });
  };

  useEffect(() => {
    setWorkInfo(prework);
  }, [prework]);
  useEffect(() => {
    onWorkWrite(workInfo);
  }, [workInfo]);

  return (
    <Box sx={{ paddingTop: '1rem', height: '100%' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <GetWorkName
              handleWorkInfo={handleWorkInfo}
              preValue={workInfo.workName}
            />
          </Grid>

          <Grid item md={6}>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <GetWorkWorkDays
                  handleWorkInfo={handleWorkInfo}
                  preValue={workInfo.workDays}
                />
                일 근무
                <GetWorkDaysOff
                  handleWorkInfo={handleWorkInfo}
                  preValue={workInfo.daysOff}
                />
                일 휴무
              </Grid>
              <Grid item md={12}>
                <GetWorkGender
                  handleWorkInfo={handleWorkInfo}
                  preValue={workInfo.gender}
                />
              </Grid>
              <Grid item md={12}>
                <Grid container>
                  <GetWorkIntake
                    handleWorkInfo={handleWorkInfo}
                    preValue={workInfo.intake}
                  />
                  <GetWorkPeriod
                    handleWorkInfo={handleWorkInfo}
                    preValue={workInfo.minWorkPeriod}
                  />
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
                <GetWorkEntryDate
                  onWorkEntryDate={onWorkEntryDate}
                  preValue={workInfo.entryDate}
                />
              </Grid>
              <Grid item md={12}>
                <GetWorkSalary
                  handleWorkInfo={handleWorkInfo}
                  preValue={workInfo.salary}
                />
              </Grid>
              <Grid item md={12}>
                <GetWorkDescription
                  handleWorkInfo={handleWorkInfo}
                  preValue={workInfo.workDescription}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
