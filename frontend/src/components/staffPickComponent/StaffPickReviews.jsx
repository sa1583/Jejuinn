import { Box } from '@mui/system';
import { ImageList, ImageListItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { getReviews } from '../../api/staffPick';
import { useEffect, useState } from 'react';
import { images } from '../../assets/images';

export default function StaffPickReviews({ spotname }) {
  const navigate = useNavigate();

  const location = useLocation();
  const pageId = location.pathname.split('staffpicklist/')[1];

  const goDetail = (id) => {
    navigate(`/staffpicklist/detail/${id}`);
  };

  const [spotReviews, setSpotReviews] = useState([]);

  const getReviewList = async () => {
    const data = (await getReviews(pageId)).data;
    setSpotReviews(data);
  };

  useEffect(() => {
    getReviewList();
  }, [pageId]);

  return (
    <Box sx={{ width: '90%', padding: '2rem' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: '1.3rem', marginTop: 0, marginBottom: '15px' }}>
          <strong style={{ color: '#FF7600' }}>{spotReviews.length}건</strong>의
          리뷰
        </p>
      </Box>
      <Box sx={{ width: '100%' }}>
        <ImageList cols={3} gap={10}>
          {spotReviews.map((item) => (
            <ImageListItem key={uuidv4()} sx={{ cursor: 'pointer' }}>
              <img
                style={{ height: '230px' }}
                src={`${images.defalut_url}${item.imgPath}?w=248&fit=crop&auto=format`}
                srcSet={`${images.defalut_url}${item.imgPath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="리뷰"
                loading="lazy"
                uid={item.reviewUid}
                onClick={() => goDetail(item.reviewUid)}
              />
            </ImageListItem>
          ))}
          {spotReviews.length ? (
            ''
          ) : (
            <span style={{ fontSize: '1.2rem', color: 'grey' }}>
              작성된 리뷰가 없습니다
            </span>
          )}
        </ImageList>
      </Box>
    </Box>
  );
}
