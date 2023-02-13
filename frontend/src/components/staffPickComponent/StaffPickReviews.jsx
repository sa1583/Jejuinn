import { Box } from '@mui/system';
import { ImageList, ImageListItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
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
    <Box sx={{ width: '90%', padding: '5%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>
          <span style={{ color: '#FF7600' }}>{spotname}</span>의 리뷰
        </h2>

        <ArrowCircleLeftOutlinedIcon
          onClick={() => {
            navigate('/staffpicklist');
          }}
          sx={{ cursor: 'pointer' }}
          fontSize="large"
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {spotReviews.map((item) => (
            <ImageListItem key={uuidv4()}>
              <img
                src={`${images.defalut_url}${item.imgPath}?w=248&fit=crop&auto=format`}
                srcSet={`${images.defalut_url}${item.imgPath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="리뷰"
                loading="lazy"
                uid={item.reviewUid}
                onClick={() => goDetail(item.reviewUid)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
