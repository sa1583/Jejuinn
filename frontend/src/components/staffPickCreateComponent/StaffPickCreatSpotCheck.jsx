import { Box, Typography } from '@mui/material';
import MapApi from '../mapApi/MapApi';

export default function StaffPickCreatSpotCheck({ spotName, startSpot }) {
  return (
    <Box
      sx={{
        display: 'flex',
        jsutifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{ fontSize: 24, marginTop: '1.5rem', marginBottom: '1rem' }}
      >
        등록하려는 명소가 {spotName}이(가) 맞습니까?
      </Typography>
      <Box
        sx={{
          width: '85%',
        }}
      >
        <MapApi startSpot={startSpot} spots={startSpot} high={'23rem'} />
      </Box>
    </Box>
  );
}
