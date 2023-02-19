import { Grid, Typography } from '@mui/material';
import { Box, height } from '@mui/system';
import { useState, useEffect } from 'react';
import { guestHouseDetail } from '../../api/guestHouse';
import WhiteBox from '../whiteBox/WhiteBox';
import MapApi from '../mapApi/MapApi';
import ImageSlider from '../imageSlider/ImageSlider';
import GuestHouseInfo from '../guestHouseDetail/GuestHouseInfo';

export default function HouseInfo({ images, geustHouseId }) {
  const [guestHouse, setGuestHouse] = useState({});
  const [spots, setSpots] = useState([]);

  async function getGuestHouse() {
    const data = (await guestHouseDetail(geustHouseId)).data.guestHouse;
    setGuestHouse(data);
    setSpots([
      {
        id: data.uid,
        lat: data.lat,
        lng: data.lng,
      },
    ]);
  }

  useEffect(() => {
    getGuestHouse();
  }, [geustHouseId]);

  return (
    <>
      <Typography
        variant="h4"
        color="primary"
        sx={{
          paddingLeft: '10px',
          marginTop: '20px',
          marginBottom: '24px',
          fontWeight: 'bold',
          fontSize: '1.8rem',
        }}
      >
        | {guestHouse?.guestHouseName}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <WhiteBox cpn={<GuestHouseInfo guestHouse={guestHouse} />} />
          </Grid>
          <Grid item xs={12}>
            <WhiteBox
              cpn={<MapApi spots={spots} startSpot={spots} high={'23rem'} />}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid item xs={12}>
            <WhiteBox
              cpn={
                <Box sx={{ p: '5%' }}>
                  <ImageSlider items={images} />
                </Box>
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
