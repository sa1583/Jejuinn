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

export default function WorkUpdateComponent() {
  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();
  const { recruitmentUid } = useParams();
  const { workUid } = useParams();

  const [workInfo, setWorkInfo] = useState({
    workName: '네임을 지정해볼가요..? 이거만 폼에 띄우면 되는데..',
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

    // workName: currentWorkInfo.workName,
    // gender: currentWorkInfo.gender,
    // salary: currentWorkInfo.salary,
    // workTime: currentWorkInfo.workTime,
    // workDescription: currentWorkInfo.GetWorkDescription,
    // intake: currentWorkInfo.intake,
    // workDays: currentWorkInfo.workDays,
    // daysOff: currentWorkInfo.daysOff,
    // minWorkPeriod: currentWorkInfo.minWorkPeriod,
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

  const onClick = () => {
    console.log('!!!!!!!!!!!');
    console.log(workInfo);
    console.log('!!!!!!!!!!!');
    fetch(updateWork(workInfo, accessToken));
    navigate(`/worklist/`);
  };

  useEffect(() => {
    console.log(workInfo);
  }, [workInfo]);

  return (
    <Box sx={{ paddingTop: '1rem', height: '100%' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <GetWorkName
              handleWorkInfo={handleWorkInfo}
              preValue={'미리 받은 이름'}
            />
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
                <GetWorkEntryDate onWorkEntryDate={onWorkEntryDate} />
              </Grid>
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
      <br />
      <CustomButton type="submit" onClick={onClick}>
        저장
      </CustomButton>
    </Box>
  );
}
