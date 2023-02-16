import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { guestHouseDetail } from '../../api/guestHouse';
import WhiteBox from '../whiteBox/WhiteBox';
import MapApi from '../mapApi/MapApi';

export default function HouseInfo({ images, geustHouseId }) {
  console.log(images, geustHouseId);
  const [guestHouse, setGuestHouse] = useState({});

  async function getGuestHouse() {
    const data = (await guestHouseDetail(geustHouseId)).data.guestHouse;
    setGuestHouse(data);
  }
  console.log(guestHouse);

  useEffect(() => {
    getGuestHouse();
  }, [geustHouseId]);

  return (
    <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <h2>{guestHouse.guestHouseName}</h2>
        </Grid>
        <Grid item md={4}>
          <Box>{guestHouse.tags}</Box>
          <WhiteBox cpn={<MapApi />} />
        </Grid>
        <Grid item md={8}>
          <img src={images} alt="리크루먼트 사진 들어갈꺼임~" />
          <Box>{guestHouse.introduction}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
