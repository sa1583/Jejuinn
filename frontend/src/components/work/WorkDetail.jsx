import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function WorkDetail({ work }) {
  const navigate = useNavigate();

  const onRecruitmentDetail = () => {
    navigate(`/worklist/detail/${work.recruitmentUid}/${work.workUid}`);
  };

  return (
    <Box sx={{ padding: '3vh', height: '100%' }} onClick={onRecruitmentDetail}>
      <h2 style={{ color: '#FF7600' }}>{work.workName}</h2>
      <Grid container>
        <Grid item md={6}>
          근무방식
        </Grid>
        <Grid item md={6}>
          {work.workDays}일 근무
          <br />
          {work.daysOff}일 휴무
        </Grid>
        <Grid item md={6}>
          성별
        </Grid>
        <Grid item md={6}>
          {work.gender}
        </Grid>
        <Grid item md={6}>
          인원
        </Grid>
        <Grid item md={6}>
          {work.intake}
        </Grid>
        <Grid item md={6}>
          근무시간
        </Grid>
        <Grid item md={6}>
          {work.workTime}
        </Grid>
        <Grid item md={6}>
          급여
        </Grid>
        <Grid item md={6}>
          {work.salary}
        </Grid>
        <Grid item md={6}>
          최소근무기간
        </Grid>
        <Grid item md={6}>
          {work.minWorkPeriod}개월
        </Grid>
      </Grid>
      <div></div>
    </Box>
  );
}
