import { Box, Stack, Avatar, Typography } from '@mui/material';
import { images } from '../../../assets/images';

export default function MyMainLike({ recruitment }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={3}
      sx={{ p: '2%' }}
    >
      <Box>
        <Avatar
          src={
            recruitment.imageUrl ? recruitment.imageUrl : images.sample_profile
          }
          sx={{ width: 75, height: 75 }}
        />
      </Box>
      <Stack direction="column" justifyContent="center" sx={{ width: '70%' }}>
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
      <Box
        component="span"
        sx={{
          bgcolor: recruitment.isRead ? 'primary.main' : 'white',
          color: recruitment.isRead ? 'white' : 'grey',
          border: 'solid 3px',
          borderColor: recruitment.isRead ? 'primary.main' : 'grey',
          borderRadius: '50px',
          width: 70,
          height: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
          opacity: recruitment.isRead !== undefined ? 1 : 0,
        }}
      >
        {recruitment.isRead ? '열람' : '미열람'}
      </Box>
    </Stack>
  );
}
