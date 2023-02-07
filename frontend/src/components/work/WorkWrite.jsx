import { Grid, Button, styled, Box } from '@mui/material';
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

export default function WorkWrite({ OnClick }) {
  const TwoCalls = () => {
    OnClick();
    // works에 추가하고 서버에 post/put 하기
  };
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <form>
        <Grid container>
          <Grid item md={6}>
            <GetWorkName />
            <Grid md={12}>근무방식</Grid>
            <GetWorkWorkDays />일 근무
            <GetWorkDaysOff />일 휴무
            <GetWorkGender />
            <Grid container>
              <GetWorkIntake />
              <GetWorkPeriod />
            </Grid>
            <Grid container>
              <GetWorkStartTime /> ~
              <GetWorkEndTime />
            </Grid>
          </Grid>
          <Grid item md={6}>
            <GetWorkSalary />
            <div>workDescription</div>
          </Grid>

          <CustomButton onClick={TwoCalls}>추가</CustomButton>
        </Grid>
      </form>
    </Box>
  );
}
