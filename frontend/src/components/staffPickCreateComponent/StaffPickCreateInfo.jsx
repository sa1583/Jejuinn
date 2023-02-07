import { Box, Button, Typography } from '@mui/material';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { useState } from 'react';
import StaffPickCreateNewSpot from './StaffPickCreateNewSpot';
export default function StaffPickCreateInfo({ nowPick }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <button
        style={{
          border: 'none',
          background: 'none',
          position: 'absolute',
          right: 5,
          top: 5,
        }}
        onClick={handleOpen}
      >
        <ControlPointOutlinedIcon
          sx={{ fontSize: '3rem', color: 'primary.main' }}
        />
      </button>
      <StaffPickCreateNewSpot open={open} handleClose={handleClose} />
      <h1 style={{ margin: 0 }}>기존 명소에 리뷰 등록</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'flex-start',
          justifyContent: 'start',
          width: '90%',
        }}
      >
        <Typography variant="h6">이름 :</Typography>
        <Typography variant="h6">유형 :</Typography>
        <Typography variant="h6">위치 :</Typography>
        <Typography variant="h6">평점 :</Typography>
        <h2>{nowPick}</h2>
      </Box>
    </Box>
  );
}
