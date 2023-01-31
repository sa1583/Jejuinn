import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import SpotInfo from '../../components/staffPickDetailComponent/SpotInfo';
import ReviewContent from '../../components/staffPickDetailComponent/ReviewContent';
import ReviewMap from '../../components/staffPickDetailComponent/ReviewMap';

export default function StaffPickDetail() {
  // 여기서 useEffect로 url 끝 번호를 따서
  // 글 번호로 axios 요청보내서 글 디테일 정보 받아와야함
  const location = useLocation();
  const [id, setId] = useState('');
  useEffect(() => {
    setId(location.pathname.split('detail/')[1]);
  }, []);
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <WhiteBox cpn={<SpotInfo />} />
          </Grid>
          <Grid item xs={12}>
            <WhiteBox cpn={<ReviewMap />} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <WhiteBox cpn={<ReviewContent />} />
        </Grid>
      </Grid>
    </Box>
  );
}