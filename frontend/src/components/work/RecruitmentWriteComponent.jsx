import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import {
  GetRecruitmentTitle,
  GetRecruitmentInfo,
  GetRecruitmentWelfare,
  GetRecruitmentWanted,
} from './WorkWriteForms';
import { useParams } from 'react-router-dom';

export default function RecruitmentWriteComponent({ onRecruitmentWrite }) {
  const guestHouseUid = useParams();
  const [wanted, setWanted] = useState([]);
  const [recruimentInfo, setRecruimentInfo] = useState({
    title: '',
    welfare: '',
    wanted: [],
    addInfo: '',
    guestHouseUid: parseInt(guestHouseUid['guesthouseUid']),
  });

  const handleRecruimentInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRecruimentInfo({ ...recruimentInfo, [name]: value });
  };

  function onWanted(input) {
    setWanted([...input]);
  }

  useEffect(() => {
    setRecruimentInfo({
      ...recruimentInfo,
      wanted: wanted,
    });
  }, [wanted]);

  useEffect(() => {
    onRecruitmentWrite(recruimentInfo);
  }, [recruimentInfo]);

  return (
    <>
      <Box sx={{ paddingTop: '2rem', height: '100%' }}>
        <form encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item md={12}>
              <GetRecruitmentTitle
                handleRecruimentInfo={handleRecruimentInfo}
              />
            </Grid>

            <Grid item md={6}>
              <GetRecruitmentWelfare
                handleRecruimentInfo={handleRecruimentInfo}
              />
            </Grid>

            <Grid item md={6}>
              <GetRecruitmentWanted onWanted={onWanted} />
            </Grid>

            <Grid item md={12}>
              <GetRecruitmentInfo handleRecruimentInfo={handleRecruimentInfo} />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
