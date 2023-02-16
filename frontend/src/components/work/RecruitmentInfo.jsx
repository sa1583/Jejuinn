import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { Box, Grid } from '@mui/material';

export default function RecruitmentInfo({ recruitmentUid }) {
  const [recruitmentInfo, setRecruitmentInfo] = useState({});

  async function getWork() {
    const data = await recruitmentDetail(recruitmentUid);
    setRecruitmentInfo(data.data.recruitment);
  }

  useEffect(() => {
    getWork();
  }, []);

  // console.log(recruitmentInfo);

  return (
    <Box sx={{ paddingY: '3vh', height: '100%' }}>
      <Grid container>
        <Grid item md={12}>
          <h2 style={{ color: '#FF7600' }}>{recruitmentInfo.title}</h2>
        </Grid>
      </Grid>
      <Box sx={{ paddingX: '2vh', height: '100%' }}>
        <Grid container spacing={1}>
          <Grid item md={2}>
            복지
          </Grid>
          <Grid item md={10}>
            {recruitmentInfo.welfare}
          </Grid>

          <Grid item md={2}>
            인재상
          </Grid>
          <Grid item md={10}>
            {/* {recruitmentInfo.wanted.map((person) => `#${person.type} `)} */}
          </Grid>

          <Grid item md={12}>
            추가 정보
          </Grid>
          <Grid item md={12}>
            {recruitmentInfo.addInfo}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
