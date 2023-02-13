import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import StaffPickCreateNewSpot from './StaffPickCreateNewSpot';
export default function StaffPickCreateInfo({ nowPick, getSpotsPins }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inline = (title, content) => (
    <Typography variant="h6" sx={{ fontWeight: '800' }}>
      <Box component="span" sx={{ color: 'primary.main' }}>
        {title}
      </Box>{' '}
      : {content}
    </Typography>
  );

  return (
    <Box
      sx={{
        height: '23rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          marginTop: '1rem',
          padding: '1rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <StaffPickCreateNewSpot
          open={open}
          handleClose={handleClose}
          getSpotsPins={getSpotsPins}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
        >
          기존 명소에 리뷰 등록
        </Typography>
        <Button onClick={handleOpen}>+ 새로운 명소 등록</Button>
        <Box
          sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            margin: '1rem 0 2rem 0',
          }}
        >
          {inline('이름', nowPick?.name)}
          {inline('유형', nowPick?.category)}
          {inline('주소', nowPick?.address)}
        </Box>
        <Box
          sx={{
            width: '90%',
          }}
        >
          <Typography sx={{ fontWeight: '100', textAlign: 'center' }}>
            * 지도에서 명소를 선택한 후 리뷰를 등록해주세요.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
