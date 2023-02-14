import { Stack, Avatar, Typography } from '@mui/material';
import { images } from '../../../assets/images';
export default function MyMainArticle({ post }) {
  return (
    <Stack direction="row" sx={{ p: '4%' }} alignItems="center" spacing={7}>
      <Typography
        sx={{
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '24px',
        }}
      >
        {post.travelPlaceName}
      </Typography>
      <Typography>{post.dateCreated}</Typography>
    </Stack>
  );
}
