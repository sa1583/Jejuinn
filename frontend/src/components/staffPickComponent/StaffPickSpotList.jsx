import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function StaffPickSpotList({ spotImgs, plusPageNum }) {
  const navigate = useNavigate();
  const goReviews = (e) => {
    navigate(`/staffpicklist/${e.target.id}`);
  };

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        if (isIntersecting) {
          plusPageNum();
        }
      },
      { threshold: 1 },
    ),
  );
  const bottomRef = useRef(null);

  useEffect(() => {
    setTimeout(function () {
      const currentBottomRef = bottomRef.current;
      observer.current.observe(currentBottomRef);
      return () => {
        observer.current.unobserve(currentBottomRef);
      };
    }, 500);
  }, []);

  return (
    <Box sx={{ padding: '3vh' }}>
      <h2>
        <span style={{ color: '#FF7600' }}>{spotImgs.length}개</span>의 명소
      </h2>
      <Box sx={{ width: '100%' }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {spotImgs.map((item) => (
            <ImageListItem key={uuidv4()} sx={{ cursor: 'pointer' }}>
              <img
                src={`${images.defalut_url}${item.mainImgPath}?w=248&fit=crop&auto=format`}
                srcSet={`${item.mainImgPath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="관광지"
                loading="lazy"
                id={item.travelPlaceUid}
                onClick={(e) => {
                  goReviews(e);
                }}
              />
              <ImageListItemBar title={item.travelPlaceName} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <div ref={bottomRef} />
    </Box>
  );
}
