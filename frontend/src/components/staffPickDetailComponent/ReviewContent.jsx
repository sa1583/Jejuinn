import { Avatar, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
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
import { images } from '../../assets/images';
export default function ReviewContent({ reviewContent, pageId, islogined }) {
  const access_token = useSelector(selectAccessToken);

  const getLikedReviews = async () => {
    const data = (await likedReviewLikst(access_token)).data;
    data.forEach((review) => {
      review.uid === pageId && setLiked(true);
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

  // 좋아요 취소 보내긔
  const goDisLike = async () => {
    await dislikeReview(access_token, pageId);
    setLiked((prev) => !prev);
  };

  const profileImage = () => {
    const purl = reviewContent.profileImageUrl;
    if (purl.slice(0, 4) === 'http') {
      return purl;
    } else {
      return `${images.defalut_url}${purl}`;
    }
  };

  const heart = () => {
    if (islogined) {
      if (liked) {
        return (
          <FavoriteIcon
            sx={{ fontSize: '2rem', color: '#FF7600', cursor: 'pointer' }}
            onClick={goDisLike}
          />
        );
      } else {
        return (
          <FavoriteBorderIcon
            sx={{ color: '#FF7600', fontSize: '2rem', cursor: 'pointer' }}
            onClick={goLike}
          />
        );
      }
    } else {
      return <FavoriteIcon sx={{ color: 'grey', fontSize: '2rem' }} />;
    }
  };

  return (
    <Box sx={{ padding: '5%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', alignSelf: 'center', marginBottom: '2rem' }}>
        <ImageSlider items={reviewContent?.images} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {reviewContent.profileImageUrl ? (
          <Avatar
            src={profileImage()}
            sx={{ width: '2.8rem', height: '2.8rem', bgcolor: '#FF7600' }}
          ></Avatar>
        ) : (
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              fontSize: '1rem',
            }}
          >
            {reviewContent.writer_nickname[0]}
          </Avatar>
        )}

        <Typography sx={{ fontSize: '1.1vw', fontWeight: 'bolder' }}>
          {reviewContent.writer_nickname}
        </Typography>
      </Box>
      <Rating
        value={reviewContent?.starRating}
        readOnly
        // sx={{ marginBottom: '1rem' }}
      />

      <div
        style={{
          fontSize: '20px',
          width: '100%',
          overflowY: 'auto',
          wordWrap: 'break-word',
        }}
        dangerouslySetInnerHTML={{ __html: reviewContent?.content }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
        {heart()}
      </Box>
      <CommentsList />
    </Box>
  );
}
