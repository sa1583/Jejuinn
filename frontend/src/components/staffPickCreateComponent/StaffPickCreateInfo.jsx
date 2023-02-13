import { Box, Button, Typography } from '@mui/material';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { useState } from 'react';
import StaffPickCreateNewSpot from './StaffPickCreateNewSpot';
export default function StaffPickCreateInfo({ nowPick }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inline = (title, content) => (
    <Typography variant="h6" sx={{ fontWeight: 'bolder', margin: 0 }}>
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
          padding: '1rem',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
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
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            margin: '2rem 0 0 0',
          }}
        >
          {inline('이름', nowPick?.name)}
          {inline('유형', nowPick?.category)}
          {inline('주소', nowPick?.address)}
          {inline('리뷰 수', nowPick.reviewCount && `${nowPick.reviewCount}개`)}
          {inline(
            '평점',
            nowPick.starRatingAvg && `${nowPick?.starRatingAvg} 점`,
          )}
        </Box>
      </Box>
    </Box>
  );
}
