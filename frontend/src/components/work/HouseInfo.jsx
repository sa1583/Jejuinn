import { Grid } from '@mui/material';
import { Box, height } from '@mui/system';
import { useState, useEffect } from 'react';
import { guestHouseDetail } from '../../api/guestHouse';
import WhiteBox from '../whiteBox/WhiteBox';
import MapApi from '../mapApi/MapApi';
import ImageSlider from '../imageSlider/ImageSlider';

export default function HouseInfo({ images, geustHouseId }) {
  const [guestHouse, setGuestHouse] = useState({});
  // if images null : images= guesthouse.image

  async function getGuestHouse() {
    const data = (await guestHouseDetail(geustHouseId)).data.guestHouse;
    setGuestHouse(data);
  }

  useEffect(() => {
    getGuestHouse();
  }, [geustHouseId]);
  // console.log(guestHouse);
  return (
    <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <h2>{guestHouse.guestHouseName}</h2>
        </Grid>
        <Grid item md={4}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Box>{guestHouse.address}</Box>
            </Grid>
            <Grid item md={12}>
              <WhiteBox cpn={<MapApi />} />
            </Grid>
            <Grid item md={12}>
              <Box>{guestHouse.guestHouseTypes?.map((tag) => `#${tag} `)}</Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8}>
          <ImageSlider items={images} />
          <Box>{guestHouse.introduction}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
