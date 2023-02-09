import { Box, Typography } from '@mui/material';
import MapApi from '../mapApi/MapApi';

export default function StaffPickCreatSpotCheck({
  spotName,
  area,
  startSpot,
  newtype,
  shortArea,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        jsutifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4">
        등록하려는 명소가 {spotName}이(가) 맞습니까?
      </Typography>
      <Typography>{newtype}</Typography>
      <Typography variant="h5">{area}</Typography>
      <Typography variant="h5">{shortArea}</Typography>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <MapApi startSpot={startSpot} spots={startSpot} />
      </Box>
    </Box>
  );
}
