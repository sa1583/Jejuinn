import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSpotInfo } from '../../api/staffPick';

export default function SpotInfo() {
  const location = useLocation();
  const pageId = location.pathname.split('detail/')[1];

  const [spotInfo, setSpotInfo] = useState([]);

  const getSpotdetail = async () => {
    const data = (await getSpotInfo(pageId)).data.travelPlace;
    console.log(data);
    setSpotInfo(data);
  };

  useState(() => {
    getSpotdetail();
  }, []);

  return (
    <Box sx={{ width: '90%', height: '20rem', padding: '5%' }}>
      <Typography>이름 : {spotInfo?.name}</Typography>
      <Typography>유형 : {spotInfo?.category}</Typography>
      <Typography>주소 : {spotInfo?.address}</Typography>
      <Typography>리뷰 수 : {spotInfo?.reviewCount}</Typography>
      <Typography>평점 : {spotInfo?.starRatingAvg}</Typography>
    </Box>
  );
}
