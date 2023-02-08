import { Box, Stack, Avatar, Typography } from '@mui/material';
import { images } from '../../assets/images';

export default function MyMainLike({ recruitment }) {
  return (
    <Stack direction="row" spacing={7} sx={{ p: '2%' }}>
      <Box>
        <Avatar
          src={
            recruitment.imageUrl ? recruitment.imageUrl : images.sample_profile
          }
          sx={{ width: 75, height: 75 }}
        />
      </Box>
      <Stack direction="column" justifyContent="center">
        <Typography>{recruitment.name}</Typography>
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '24px',
          }}
        >
          {recruitment.title}
        </Typography>
      </Stack>
    </Stack>
  );
}
