import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import GuestHouseInfo from '../../components/guestHouseDetail/GuestHouseInfo';
import GuestHouseContent from '../../components/guestHouseDetail/GuestHouseContent';
import GuestHouseMap from '../../components/guestHouseDetail/GuestHouseMap';

export default function GuestHouseDetail() {
  // 여기서 useEffect로 url 끝 번호를 따서
  // 글 번호로 axios 요청보내서 글 디테일 정보 받아와야함
  const location = useLocation();
  const [id, setId] = useState('');
  useEffect(() => {
    setId(location.pathname.split('detail/')[1]);
  }, []);

  return (
    <Box sx={{ paddingY: '2rem', paddingX: '20%' }}>
      <h1 style={{ color: '#FF7600' }}>| 간장남게스트하우스</h1>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <WhiteBox cpn={<GuestHouseInfo />} />
          </Grid>
          <Grid item xs={12}>
            <WhiteBox cpn={<GuestHouseMap />} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid item xs={12}>
            <WhiteBox cpn={<GuestHouseContent />} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
