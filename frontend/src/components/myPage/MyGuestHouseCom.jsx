import { Box } from '@mui/material';

export default function MyGuestHouseCom({ myGuestHouse }) {
  return (
    <Box sx={{ paddingX: '4vh' }}>
      <h4 style={{ color: '#FF7600' }}>{myGuestHouse.gusetHouseName}</h4>
    </Box>
  );
}
