import { Grid } from '@mui/material';
import { Box, height } from '@mui/system';
import { useState, useEffect } from 'react';
import { guestHouseDetail } from '../../api/guestHouse';
import WhiteBox from '../whiteBox/WhiteBox';
import MapApi from '../mapApi/MapApi';
import ImageSlider from '../imageSlider/ImageSlider';

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
    <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <h2>{guestHouse.guestHouseName}</h2>
        </Grid>
        <Grid item md={8}>
          <ImageSlider items={images} />
        </Grid>

        <Grid item md={4}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Box>{guestHouse.address}</Box>
            </Grid>
            <Grid item md={12}>
              <WhiteBox
                cpn={<MapApi spots={spots} startSpot={spots} high={'23rem'} />}
              />
            </Grid>
            <Grid item md={12}>
              <Box>{guestHouse.guestHouseTypes?.map((tag) => `#${tag} `)}</Box>

              <Box>{guestHouse.introduction}</Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
