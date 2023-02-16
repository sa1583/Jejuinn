import { Box, Grid, Stack, Typography } from '@mui/material';

export default function WorkInfo({ work }) {
  console.log(work);
  return (
    <Stack p="2rem" direction="column" spacing={2}>
      <Typography variant="h5" color="primary">
        {work.workName}
      </Typography>
      <Stack direction="row">
        <Typography minWidth="100px">근무 방식</Typography>
        <Typography>
          {work.workDays}일 근무 {work.daysOff}일 휴무
        </Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">근무 시작일</Typography>
        <Typography>{work.entryDate}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">성별</Typography>
        <Typography>{work.gender}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">모집 인원</Typography>
        <Typography>{work.intake}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">최소근무 기간</Typography>
        <Typography>{work.minWorkPeriod}개월</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">급여</Typography>
        <Typography>{work.salary}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">근무 시간</Typography>
        <Typography>{work.workTime}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">직무 소개</Typography>
        <Typography>{work.workDescription}</Typography>
      </Stack>
    </Stack>
  );
}
