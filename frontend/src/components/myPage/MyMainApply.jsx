import { Box, Stack, Avatar, Typography } from '@mui/material';
import { images } from '../../assets/images';

export default function MyMainApply({ id }) {
  const data = {
    guestHouseName: '파티 게스트하우스',
    recruitmentImageUrl: null,
    recruitmentTitle: '파티 게스트하우스 여자 스탭 1인 모집 ',
    isRead: false,
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={3}
      sx={{ padding: '2%' }}
    >
      <Avatar
        src={
          data.recruitmentImageUrl
            ? data.recruitmentImageUrl
            : images.sample_profile
        }
        sx={{ width: '75px', height: '75px' }}
      />
      <Stack direction="column" justifyContent="center" width="70%">
        <Typography>{data.guestHouseName}</Typography>
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
          }}
        >
          {data.recruitmentTitle}
        </Typography>
      </Stack>
      <Box
        component="span"
        sx={{
          bgcolor: data.isRead ? 'primary.main' : 'white',
          color: data.isRead ? 'white' : 'grey',
          border: 'solid 3px',
          borderColor: data.isRead ? 'primary.main' : 'grey',
          borderRadius: '50px',
          width: 70,
          height: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '20px',
        }}
      >
        {data.isRead ? '열람' : '미열람'}
      </Box>
    </Stack>
  );
}
