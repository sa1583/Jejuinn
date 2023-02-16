import { Typography, Rating } from '@mui/material';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';

export default function StaffPickSpotInfo({ selectedSpot }) {
  const inline = (title, content) => (
    <Typography variant="p" sx={{ fontSize: '1.2rem' }}>
      {title}&nbsp;&nbsp;&nbsp;
      <Box component="span" sx={{ fontWeight: 'bold' }}>
        {content}
      </Box>
    </Typography>
  );
  const location = useLocation();
  const isDetail = location.pathname.split('staffpicklist/')[1][0] === 'd';
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
        {isDetail && (
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#FF7600',
              marginBottom: '10px',
            }}
          >
            | {selectedSpot.name}
          </Typography>
        )}
        <p style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '5px' }}>
          기본정보
        </p>

        {/* {selectedSpot.starRatingAvg && ( */}
        {inline(
          '평점',
          <Rating
            value={selectedSpot?.starRatingAvg}
            readOnly
            sx={{ marginBottom: '8px' }}
          />,
        )}
        {inline('유형', selectedSpot?.category)}
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ fontSize: '1.2rem', width: '53px' }}>주소</Box>
          <Box component="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {selectedSpot?.address}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
