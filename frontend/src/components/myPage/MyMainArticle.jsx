import { Stack, Avatar, Typography } from '@mui/material';
import { images } from '../../assets/images';
export default function MyMainArticle({ post }) {
  return (
    <Stack direction="row" sx={{ p: '2%' }} spacing={7}>
      <Avatar
        src={post.imageUrl ? post.imageUrl : images.sample_profile}
        sx={{ width: '75px', height: '75px' }}
      />
      <Stack justifyContent="center">
        <Typography
          sx={{
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
          }}
        >
          {post.name}
        </Typography>
      </Stack>
    </Stack>
  );
}
