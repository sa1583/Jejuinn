import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { Box, Button, Grid } from '@mui/material';
import { GetRecruitmentTitle } from './WorkWriteForms';
import { writeRecruitment } from '../../api/work';

export default function RecruitmentWrite({ onClick }) {
  // Recruitment, work id 받아서

  return (
    <Box sx={{ paddingY: '3vh', height: '100%' }}>
      <Grid container>
        <Grid item md={10}>
          <h2 style={{ color: '#FF7600' }}>
            <GetRecruitmentTitle />
          </h2>
        </Grid>
        <Grid item md={2}>
          <Button onClick={onClick}>저장</Button>
        </Grid>
      </Grid>

      <Box sx={{ paddingX: '2vh', height: '100%' }}>
        <Grid container>
          <Grid item md={3}>
            복지
          </Grid>
          <Grid item md={9}>
            복지 작성
          </Grid>

          <Grid item md={3}>
            인재상
          </Grid>
          <Grid item md={9}>
            복지 작성
          </Grid>

          <Grid item md={3}>
            추가 정보
          </Grid>
          <Grid item md={9}>
            복지 작성
          </Grid>
        </Grid>
        <div>
          워크 아이디 부여되면 해당 워크 관련 정보 보여주고 아래 진행중인 채용
          목록에서는 제외 /// 이미지 입력: 위에 게하정보 보여주는 데서 할거임!
        </div>
      </Box>
    </Box>
  );
}
