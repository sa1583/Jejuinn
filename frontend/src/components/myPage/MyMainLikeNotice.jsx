import { Box, Stack, Avatar, Typography } from '@mui/material';
import { images } from '../../assets/images';

export default function MyMainLike({ notice }) {
  return (
    <Stack direction="row" spacing={7} sx={{ p: '2%' }}>
      <Box>
        <Avatar
          src={notice.imageUrl ? notice.imageUrl : images.sample_profile}
          sx={{ width: 75, height: 75 }}
        />
      </Box>
      <Stack direction="column" justifyContent="center">
        <Typography>{notice.name}</Typography>
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '24px',
          }}
        >
          {notice.title}
        </Typography>
      </Stack>
    </Stack>
  );
}
