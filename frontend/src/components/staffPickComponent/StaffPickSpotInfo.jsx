import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function StaffPickSpotInfo({ selectedSpot }) {
  const inline = (title, content) => (
    <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>
      <Box component="span" sx={{ color: 'primary.main' }}>
        {title}
      </Box>{' '}
      : {content}
    </Typography>
  );
  console.log(selectedSpot);
  return (
    <Box
      sx={{
        width: '100%',
        height: '20rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          alignSelf: 'center',
          color: 'primary.main',
          marginTop: '1rem',
          fontWeight: 'bold',
        }}
      >
        {selectedSpot?.name}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem  2rem ',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        {inline('유형', selectedSpot?.category)}
        {inline('주소', selectedSpot?.address)}
        {inline('리뷰 수', `${selectedSpot?.reviewCount} 개`)}
        {inline('평점', `${selectedSpot?.starRatingAvg} 점`)}
      </Box>
    </Box>
  );
}
