import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRef, useEffect } from 'react';

export default function GuestHouseList({ guestHouses, plusPageNum }) {
  const navigate = useNavigate();

  const goDetail = (guestHouseUid) => {
    navigate(`detail/${guestHouseUid}`);
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
    <Box sx={{ padding: '0' }}>
      <p style={{ fontSize: '1.3rem', paddingLeft: '10px' }}>
        <strong style={{ color: '#FF7600' }}>{guestHouses.length}건</strong>의
        검색결과
      </p>
      <Box sx={{ width: '100%' }}>
        <ImageList cols={3} gap={25} style={{ padding: '1vh' }}>
          {guestHouses.map((guestHouse) => (
            <ImageListItem
              key={uuidv4()}
              sx={{ cursor: 'pointer' }}
              onClick={() => goDetail(guestHouse.guestHouse.uid)}
            >
              <Card
                style={{
                  boxShadow:
                    'rgba(17, 17, 26, 0.05) 0px 1px 0px rgba(17, 17, 26, 0.1) 0px 0px 8px',
                }}
              >
                <CardActionArea sx={{ padding: '1.5vh' }}>
                  <CardMedia
                    component="img"
                    height="330"
                    image={`${images.defalut_url}${guestHouse.images[0]?.imgPath}?w=248&fit=crop&auto=format`}
                    alt={guestHouse.guestHouse.guestHouseName}
                    loading="lazy"
                    id={guestHouse.guestHouse.uid}
                    name={guestHouse.guestHouse.guestHouseName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {guestHouse.guestHouse.guestHouseName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              {/* <img
                src={`${images.defalut_url}${guestHouse.images[0]?.imgPath}?w=248&fit=crop&auto=format`}
                srcSet={`${guestHouse.images[0]?.imgPath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={guestHouse.guestHouse.guestHouseName}
                loading="lazy"
              />
              <ImageListItemBar
                title={guestHouse.guestHouse.guestHouseName}
                position="below"
              /> */}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <div ref={bottomRef} />
    </Box>
  );
}
