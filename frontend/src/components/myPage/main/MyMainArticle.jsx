import { Stack, Typography, Rating } from '@mui/material';
import { images } from '../../../assets/images';

export default function MyMainArticle({ post }) {
  const getUrl = () => {
    return `${images.defalut_url}${post.imgUrl}`;
  };

  return (
    <Stack direction="row" sx={{ p: '4%' }} alignItems="center" spacing={7}>
      <img
        src={getUrl()}
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'cover',
        }}
      />
      <Typography variant="h6">{post.title}</Typography>
      <Rating value={post.starRatingAvg} readOnly />
      <Typography>{post.dateCreated}</Typography>
    </Stack>
  );
}
