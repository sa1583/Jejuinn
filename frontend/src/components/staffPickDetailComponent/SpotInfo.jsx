import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function SpotInfo({ spotInfo }) {
  const inline = (title, content) => (
    <Typography variant="h5" sx={{ fontWeight: 'bolder' }}>
      <Box component="span" sx={{ color: 'primary.main' }}>
        {title}
      </Box>{' '}
      : {content}
    </Typography>
  );
  return (
    <Box
      sx={{
        width: '90%',
        height: '20rem',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        justifyContent: 'center',
      }}
    >
      {inline('이름', spotInfo?.name)}
      {inline('유형', spotInfo?.category)}
      {inline('주소', spotInfo?.address)}
      {inline('리뷰 수', `${spotInfo?.reviewCount} 개`)}
      {inline('평점', `${spotInfo?.starRatingAvg} 점`)}
    </Box>
  );
}
