import { Avatar, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { deepOrange } from '@mui/material/colors';
import ImageSlider from '../imageSlider/ImageSlider';
import { useState } from 'react';
import {
  dislikeReview,
  likedReviewLikst,
  likeReview,
} from '../../api/staffPick';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/user';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentsList from '../commentComponent/CommentsList';
export default function ReviewContent({ reviewContent, pageId, islogined }) {
  const access_token = useSelector(selectAccessToken);

  const getLikedReviews = async () => {
    const data = (await likedReviewLikst(access_token)).data;
    data.forEach((review) => {
      review.uid == pageId && setLiked(true);
    });
  };

  useState(() => {
    if (islogined) {
      getLikedReviews();
    }
  }, []);

  const [liked, setLiked] = useState(false);

  // 좋아요 보내긔
  const goLike = async () => {
    if (islogined) {
      await likeReview(access_token, pageId);
      setLiked((prev) => !prev);
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  console.log(reviewContent);

  // 좋아요 취소 보내긔
  const goDisLike = async () => {
    await dislikeReview(access_token, pageId);
    setLiked((prev) => !prev);
  };

  return (
    <Box sx={{ padding: '5%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', alignSelf: 'center' }}>
        <ImageSlider items={reviewContent?.images} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>Cho</Avatar>
        <p style={{ fontSize: '1.5vw', fontWeight: 'bolder' }}>
          {reviewContent.writer_nickname}
        </p>
      </Box>
      <Rating
        value={reviewContent?.starRating}
        readOnly
        sx={{ marginBottom: '2rem' }}
      />

      <div dangerouslySetInnerHTML={{ __html: reviewContent?.content }} />

      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
        {liked && (
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={goDisLike}
          >
            <FavoriteIcon sx={{ fontSize: '2rem', color: 'red' }} />
          </button>
        )}
        {!liked && (
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={goLike}
          >
            <FavoriteBorderIcon sx={{ color: 'red', fontSize: '2rem' }} />
          </button>
        )}
      </Box>
      <CommentsList />
    </Box>
  );
}
