import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import {
  GetRecruitmentTitle,
  GetRecruitmentInfo,
  GetRecruitmentWelfare,
  GetRecruitmentPersontype,
} from './WorkWriteForms';

export default function RecruitmentWrite({ onRecruitmentWrite }) {
  const [persontype, setPersontype] = useState([]);
  function onPersontype(input) {
    setPersontype([...input]);
  }
  const [recruimentInfo, setRecruimentInfo] = useState({
    title: '',
    welfare: '',
    persontype: [],
    addInfo: '',
  });

  const handleRecruimentInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRecruimentInfo({ ...recruimentInfo, [name]: value });
  };

  // 이거 적용이 조금 이상해.. 수정 필요 반박자 늦어요..
  useEffect(() => {
    setRecruimentInfo({
      ...recruimentInfo,
      persontype: persontype,
    });
  }, [persontype]);

  useEffect(() => {
    onRecruitmentWrite(recruimentInfo);
  }, [recruimentInfo]);

  return (
    <Box sx={{ paddingTop: '2rem', height: '100%' }}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <GetRecruitmentTitle handleRecruimentInfo={handleRecruimentInfo} />
        </Grid>
        <Grid item md={6}>
          <GetRecruitmentWelfare handleRecruimentInfo={handleRecruimentInfo} />
        </Grid>

        <Grid item md={6}>
          <GetRecruitmentPersontype onPersontype={onPersontype} />
        </Grid>

        <Grid item md={12}>
          <GetRecruitmentInfo handleRecruimentInfo={handleRecruimentInfo} />
        </Grid>
      </Grid>
    </Box>
  );
}
