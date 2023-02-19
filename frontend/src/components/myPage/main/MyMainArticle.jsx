import { Stack, Typography, Rating } from '@mui/material';
import { images } from '../../../assets/images';

export default function MyMainArticle({ post }) {
  const getUrl = () => {
    return `${images.defalut_url}${post.imgUrl}`;
  };

  return (
    <Stack direction="row" sx={{ p: '3%', px: '4%' }} alignItems="center">
      <img
        src={getUrl()}
        style={{
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          borderRadius: '50px',
          marginRight: '30px',
        }}
      />
      <Typography
        variant="h6"
        sx={{
          marginRight: '30px',
          minWidth: '130px',
          maxWidth: '130px',
        }}
      >
        {post.title}
      </Typography>
      <Rating value={post.starRatingAvg} readOnly />
    </Stack>
  );
}
