import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { Box, Button, Grid } from '@mui/material';

export default function RecruitmentInfo({ id, onClick }) {
  const [recruitment, setRecruitment] = useState({});

  async function getWork() {
    // const data = await recruitmentDetail(recruitmentUid);
    // console.log(data.data);
    // setRecruitment(data.data.recruitment);
  }

  useEffect(() => {
    getWork();
  }, []);

  return (
    <Box sx={{ paddingY: '3vh', height: '100%' }}>
      <Grid container>
        <Grid item md={12}>
          <h2 style={{ color: '#FF7600' }}>
            {recruitment.title}(recruitment.title)
          </h2>
        </Grid>
      </Grid>
      <Box sx={{ paddingX: '2vh', height: '100%' }}>
        <Grid container>
          <Grid item md={3}>
            복지
          </Grid>
          <Grid item md={9}>
            {recruitment.welfare}
          </Grid>

          <Grid item md={3}>
            인재상
          </Grid>
          <Grid item md={9}>
            {recruitment.wanted}
          </Grid>

          <Grid item md={3}>
            추가 정보
          </Grid>
          <Grid item md={9}>
            {recruitment.addInfo}
          </Grid>
        </Grid>

        <br />
        <div>
          워크 아이디 부여되면 해당 워크 관련 정보 보여주고 아래 진행중인 채용
          목록에서는 제외
        </div>
      </Box>
    </Box>
  );
}
