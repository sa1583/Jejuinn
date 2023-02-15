import { Box } from '@mui/system';
import ImageSlider from '../imageSlider/ImageSlider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentsList from '../../components/commentComponent/CommentsList';

export default function GuestHouseContent({
  guestHouse,
  images,
  likeState,
  handleLikeGuestHouse,
  handleCancleLikeGuestHouse,
}) {
  return (
    <Box sx={{ p: '5%' }}>
      <ImageSlider items={images} />
      <h2 style={{ color: '#FF7600', marginTop: '30px' }}>소개글</h2>
      <div dangerouslySetInnerHTML={{ __html: guestHouse?.introduction }} />
      {likeState === 0 ? (
        <FavoriteIcon
          sx={{
            color: 'grey',
            fontSize: '2rem',
            marginTop: '30px',
          }}
        />
      ) : likeState === 1 ? (
        <FavoriteBorderIcon
          sx={{
            color: '#FF7600',
            fontSize: '2rem',
            cursor: 'pointer',
            marginTop: '30px',
          }}
          onClick={handleLikeGuestHouse}
        />
      ) : (
        <FavoriteIcon
          sx={{
            color: '#FF7600',
            fontSize: '2rem',
            cursor: 'pointer',
            marginTop: '30px',
          }}
          onClick={handleCancleLikeGuestHouse}
        />
      )}
      <br />
      <CommentsList />
    </Box>
  );
}
