import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function StaffPickSpotInfo({ selectedSpot }) {
  const inline = (title, content) => (
    <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>
      <Box component="span" sx={{ color: 'primary.main' }}>
        {title}
      </Box>{' '}
      : {content}
    </Typography>
  );
  return (
    <Box
      sx={{
        width: '90%',
        height: '20rem',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        justifyContent: 'center',
      }}
    >
      {inline('이름', selectedSpot?.name)}
      {inline('유형', selectedSpot?.category)}
      {inline('주소', selectedSpot?.address)}
      {inline('리뷰 수', `${selectedSpot?.reviewCount} 개`)}
      {inline('평점', `${selectedSpot?.starRatingAvg} 점`)}
    </Box>
  );
}
