import { Typography, Rating } from '@mui/material';
import { Box } from '@mui/system';

export default function StaffPickSpotInfo({ selectedSpot }) {
  const inline = (title, content) => (
    <Typography variant="p" sx={{ fontSize: '17px' }}>
      {title}&nbsp;&nbsp;&nbsp;
      <Box component="span" sx={{ fontWeight: 'bold' }}>
        {content}
      </Box>
    </Typography>
  );
  return (
    <Box
      sx={{
        width: '100%',
        // height: '20rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem  2rem ',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        <p style={{ fontSize: '1.3rem', marginTop: 0, marginBottom: '10px' }}>
          기본정보
        </p>
        {selectedSpot.starRatingAvg && (
          <Rating
            value={selectedSpot?.starRatingAvg}
            readOnly
            sx={{ marginBottom: '8px' }}
          />
        )}
        {inline('유형', selectedSpot?.category)}
        {inline('주소', selectedSpot?.address)}
        {/* {inline('리뷰 수', `${selectedSpot?.reviewCount} 개`)} */}
      </Box>
    </Box>
  );
}
