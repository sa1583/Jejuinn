import { Box } from '@mui/system';
import ImageSlider from '../imageSlider/ImageSlider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
      <h2 style={{ color: '#FF7600' }}>소개글</h2>
      <div dangerouslySetInnerHTML={{ __html: guestHouse?.introduction }} />
      {likeState === 0 ? (
        <FavoriteIcon sx={{ color: 'grey', fontSize: '2rem' }} />
      ) : likeState === 1 ? (
        <FavoriteBorderIcon
          sx={{ color: 'red', fontSize: '2rem', cursor: 'pointer' }}
          onClick={handleLikeGuestHouse}
        />
      ) : (
        <FavoriteIcon
          sx={{ color: 'red', fontSize: '2rem', cursor: 'pointer' }}
          onClick={handleCancleLikeGuestHouse}
        />
      )}
      <br />
    </Box>
  );
}
