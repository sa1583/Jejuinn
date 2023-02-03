import { Box, Grid, styled, Button } from '@mui/material';

const CustomButton = styled(Button)({
  border: '1px solid #FF7600',
  variant: 'outlined',
  color: '#FF7600',
  width: '70%',
  borderRadius: '62px',
  fontFamily: 'border',
  height: '5vh',
  '&:hover': {
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    backgroundColor: '#FF7600',
  },
});

export default function MyResumeWrite({ changeApplyComp }) {
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          이름
        </Grid>
        <Grid item md={8}>
          userInfo.username
        </Grid>

        <Grid item md={4}>
          나이 (성별)
        </Grid>
        <Grid item md={8}>
          userInfo.age, userInfo.gender
        </Grid>

        <Grid item md={4}>
          휴대폰번호
        </Grid>
        <Grid item md={8}>
          userInfo.phone
        </Grid>

        <Grid item md={4}>
          이메일
        </Grid>
        <Grid item md={8}>
          userInfo.email
        </Grid>
      </Grid>
      <CustomButton onClick={changeApplyComp}>지원서 저장</CustomButton>
    </Box>
  );
}
