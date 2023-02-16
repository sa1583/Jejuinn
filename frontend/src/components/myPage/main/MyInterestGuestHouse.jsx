import { Stack, Typography, Box } from '@mui/material';
import { images } from '../../../assets/images';

export default function MyInterestGuestHouse({ guestHouse }) {
  const getImageUrl = () => {
    return `${images.defalut_url}${guestHouse?.imgUrl}`;
  };

  return (
    <Stack
      direction="row"
      sx={{ p: '3%', px: '4%' }}
      alignItems="center"
      spacing={4}
    >
      <img
        src={getImageUrl()}
        style={{
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          borderRadius: '50px',
        }}
      />
      <Box>
        <Typography sx={{ fontWeight: 'bold', color: '#ff7600' }}>
          게스트하우스
        </Typography>
        <Typography variant="h6">{guestHouse?.guestHouseName}</Typography>
      </Box>
    </Stack>
  );
}
