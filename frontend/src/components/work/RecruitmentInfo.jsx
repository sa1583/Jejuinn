import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

export default function RecruitmentInfo({ recruitmentUid }) {
  const [recruitmentInfo, setRecruitmentInfo] = useState({});

  async function getWork() {
    const data = await recruitmentDetail(recruitmentUid);
    setRecruitmentInfo(data.data.recruitment);
  }

  useEffect(() => {
    getWork();
  }, []);

  return (
    <Box sx={{ padding: '2rem', height: '100%' }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4" sx={{ color: '#FF7600' }}>
          {recruitmentInfo.title}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography minWidth="60px">복지</Typography>
          <Typography>{recruitmentInfo.welfare}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography minWidth="60px">인재상</Typography>
          {recruitmentInfo.wanted?.map((person) => (
            <Chip label={'#' + person.type} color="primary" />
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography minWidth="60px">추가정보</Typography>
          <Typography>{recruitmentInfo.addInfo}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
