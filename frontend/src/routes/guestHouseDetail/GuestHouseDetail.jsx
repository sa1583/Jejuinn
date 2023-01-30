import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import GuestHouseInfo from '../../components/guestHouseDetail/GuestHouseInfo';
import GuestHouseContent from '../../components/guestHouseDetail/GuestHouseContent';
import GuestHouseReview from '../../components/guestHouseDetail/GuestHouseReview';
import GuestHouseMap from '../../components/guestHouseDetail/GuestHouseMap';

export default function GuestHouseDetail() {
  const location = useLocation();
  const [id, setId] = useState('');
  useEffect(() => {
    setId(location.pathname.split('detail/')[1]);
  }, []);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
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
          <Grid item xs={12}>
            <WhiteBox cpn={<GuestHouseReview />} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
