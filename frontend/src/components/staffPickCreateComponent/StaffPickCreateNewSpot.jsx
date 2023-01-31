import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function StaffPickCreateNewSpot({
  newSpotName,
  handleNewSpotName,
  area,
}) {
  return (
    <Box
      sx={{
        height: '23rem',
      }}
    >
      <Box
        sx={{
          padding: '3vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '4vh',
        }}
      >
        <Typography
          sx={{ fontSize: '2vw', color: '#FF7600', fontWeight: 'bolder' }}
        >
          새로운 명소 등록
        </Typography>

        <label htmlFor="name">명소 이름</label>
        <input
          id="name"
          type="text"
          value={newSpotName}
          onChange={handleNewSpotName}
          style={{ width: '100%' }}
        />
        <label htmlFor="address">위치</label>

        <Typography variant="p">{area}</Typography>
      </Box>
    </Box>
  );
}
