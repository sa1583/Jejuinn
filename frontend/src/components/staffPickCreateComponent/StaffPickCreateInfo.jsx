import { Box } from '@mui/material';

export default function StaffPickCreateInfo({ nowPick }) {
  return (
    <Box
      sx={{
        height: '23rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ margin: 0 }}>위치를 지정해주세요.</h1>
      <h2>{nowPick}</h2>
    </Box>
  );
}
