import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StaffPickCreateNewSpot from './StaffPickCreateNewSpot';
export default function StaffPickCreateInfo({ nowPick, getSpotsPins }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const isCreate = location.pathname.split('staffpicklist/')[1][0] === 'c';
  const inline = (title, content) => (
    <Typography variant="h6">
      <Box component="span" sx={{ color: 'black' }}>
        {title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Box>
      <Box component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
        {content}
      </Box>
    </Typography>
  );

  return (
    <Box
      sx={{
        // height: '23rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        paddingX: '20px',
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
          style={{ fontSize: 23, color: 'black', marginBottom: '5px' }}
        >
          선택한 명소에 대한 정보입니다
        </Typography>
        {isCreate && (
          <Typography
            variant="h5"
            style={{ fontSize: 17, color: '#FF7600', marginBottom: '10px' }}
          >
            (만약 지도에 원하는 핀이 없다면 아래 버튼을 눌러 새로운 명소를
            등록해주세요)
          </Typography>
        )}

        {isCreate && (
          <Button
            variant="contained"
            sx={{
              '&:hover': {
                background: '#FF7600',
              },
            }}
            onClick={handleOpen}
          >
            새로운 명소 등록하기
          </Button>
        )}

        <br />
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
      </Box>
    </Box>
  );
}
