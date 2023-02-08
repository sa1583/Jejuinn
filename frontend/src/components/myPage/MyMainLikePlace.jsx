import { Box, Stack, Avatar, Typography } from '@mui/material';
import { images } from '../../assets/images';

export default function MyMainLike({ place }) {
  return (
    <Stack direction="row" spacing={7} sx={{ p: '2%' }}>
      <Box>
        <Avatar
          src={place.imageUrl ? place.imageUrl : images.sample_profile}
          sx={{ width: 75, height: 75 }}
        />
      </Box>
      <Stack direction="column" justifyContent="center">
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '24px',
          }}
        >
          {place.name}
        </Typography>
      </Stack>
    </Stack>
  );
}
