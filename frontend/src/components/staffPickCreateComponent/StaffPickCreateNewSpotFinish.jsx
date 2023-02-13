import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function StaffPickCreateNewSpotFinish() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop: '4rem',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: 'primary.main', fontWeight: 'bold', marginBottom: '2rem' }}
      >
        명소 등록 완료
      </Typography>
      <Typography variant="h5">등록한 명소에 리뷰를 등록해주세요!</Typography>
    </Box>
  );
}
