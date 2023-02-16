import { Grid } from '@mui/material';

export default function WorkInfo({ work }) {
  console.log(work);
  return (
    <>
      <h3>{work.workName}</h3>
      <Grid container>
        <Grid item md={2}>
          근무 방식
        </Grid>
        <Grid item md={10}>
          {work.workDays}일 근무 {work.daysOff}일 휴무
        </Grid>
        <Grid item md={2}>
          근무 시작일
        </Grid>
        <Grid item md={10}>
          {work.entryDate}
        </Grid>

        <Grid item md={2}>
          성별
        </Grid>
        <Grid item md={10}>
          {work.gender}
        </Grid>

        <Grid item md={2}>
          모집 인원
        </Grid>
        <Grid item md={10}>
          {work.intake}
        </Grid>

        <Grid item md={2}>
          최소근무 기간
        </Grid>
        <Grid item md={10}>
          {work.minWorkPeriod}개월
        </Grid>

        <Grid item md={2}>
          급여
        </Grid>
        <Grid item md={10}>
          {work.salary}
        </Grid>

        <Grid item md={2}>
          근무 시간
        </Grid>
        <Grid item md={10}>
          {work.workTime}
        </Grid>

        <Grid item md={2}>
          직무 소개
        </Grid>

        <Grid item md={10}>
          {work.workDescription}
        </Grid>
      </Grid>
    </>
  );
}
