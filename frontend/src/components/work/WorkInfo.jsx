import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { applyToWork, getMyApplyList } from '../../api/job';
import { getResume } from '../../api/resume';
import {
  selectAccessToken,
  selectIsLogin,
  selectUserInfo,
} from '../../store/user';

export default function WorkInfo({ work }) {
  const userInfo = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);
  const isLogin = useSelector(selectIsLogin);

  const [canApply, setCanApply] = useState(false);

  const applyWork = async () => {
    const body = {
      userUid: userInfo.uid,
      workUid: work.workUid,
    };
    try {
      await applyToWork(body, accessToken);
    } catch (error) {
      if (error.response.status === 409) {
        alert('이미 지원한 공고입니다');
      }
    }
  };

  const getExistanceOfResume = async () => {
    const { status } = await getResume(accessToken, userInfo.uid);
    if (status === 200) setCanApply(true);
  };

  useEffect(() => {
    if (isLogin) {
      getExistanceOfResume();
    }
  }, []);

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
      {canApply && (
        <Button
          sx={{
            alignSelf: 'center',
          }}
          variant="contained"
          onClick={applyWork}
        >
          지원하기
        </Button>
      )}
    </Stack>
  );
}
