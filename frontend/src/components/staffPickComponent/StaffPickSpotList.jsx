import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
    <Box sx={{ padding: '2vh 0vh' }}>
      <p style={{ fontSize: '1.3rem', paddingLeft: '10px' }}>
        <strong style={{ color: '#FF7600' }}>{spotImgs.length}건</strong>의 검색
        결과
      </p>
      <Box sx={{ width: '100%' }}>
        <ImageList cols={3} gap={25} style={{ padding: '1vh' }}>
          {spotImgs.map((item) => (
            <ImageListItem
              key={uuidv4()}
              sx={{ cursor: 'pointer' }}
              onClick={(e) => {
                goReviews(e);
              }}
            >
              <Card
                style={{
                  boxShadow:
                    'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
                }}
              >
                <CardActionArea sx={{ padding: '1.5vh' }}>
                  <CardMedia
                    component="img"
                    height="330"
                    image={`${images.defalut_url}${item.mainImgPath}?w=248&fit=crop&auto=format`}
                    alt={item.travelPlaceName}
                    loading="lazy"
                    id={item.travelPlaceUid}
                    name={item.travelPlaceName}
                  />
                  <CardContent
                    sx={{
                      width: 'auto',
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        width: '100%',
                        height: 32,
                        overflow: 'hidden',
                        overflowX: 'hidden',
                        // overflow: 'hidden',
                        // whiteSpace: 'nowrap',
                      }}
                    >
                      {item.travelPlaceName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <div ref={bottomRef} />
    </Box>
  );
}
