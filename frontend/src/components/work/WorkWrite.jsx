import { Grid, Button, styled, Box } from '@mui/material';
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
import { writeRecruitment } from '../../api/work';

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

export default function WorkWrite({ OnClick }) {
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

  const TwoCalls = () => {
    OnClick(); // workListBox에서 상속받은 함수. 작성 완료 후 클릭하면 onWrite false로 변경
    // writeRecruitment(workInfo); // 서버에 post/put 하기 정민 직무 추가하는거 만들어줘!!
  };

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item md={12}>
            0000게스트 하우스 채용 직무 추가
          </Grid>
          <Grid item md={12}>
            <GetWorkName handleWorkInfo={handleWorkInfo} />
          </Grid>

          <Grid item md={6}>
            <Grid container spacing={2}>
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

          <Grid item md={12}>
            <CustomButton onClick={TwoCalls}>추가</CustomButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
