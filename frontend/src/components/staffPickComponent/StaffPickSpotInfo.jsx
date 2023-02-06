import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function StaffPickSpotInfo({ selectedSpot }) {
  console.log(selectedSpot);
  return (
    <Box sx={{ width: '90%', height: '20rem', padding: '5%' }}>
      <Typography>이름 : {selectedSpot.name}</Typography>
      <Typography>유형 : {selectedSpot.category}</Typography>
      <Typography>주소 : {selectedSpot.address}</Typography>
      <Typography>리뷰 수 : {selectedSpot.reviewCount}</Typography>
      <Typography>평점 : {selectedSpot.starRatingAvg}</Typography>
    </Box>
  );
}
