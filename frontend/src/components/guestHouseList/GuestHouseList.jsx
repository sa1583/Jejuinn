import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

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
    <Box sx={{ padding: '4vh' }}>
      <h3 style={{ marginTop: '0' }}>
        <span style={{ color: '#FF7600' }}>{guestHouses.length}건</span>의
        검색결과
      </h3>
      <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'hidden' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {guestHouses.map((guestHouse) => (
            <ImageListItem
              key={uuidv4()}
              onClick={() => goDetail(guestHouse.guestHouse.uid)}
            >
              <img
                src={`${images.defalut_url}${guestHouse?.images[0]?.imgPath}?w=248&fit=crop&auto=format`}
                srcSet={`${guestHouse?.images[0]?.imgPath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={guestHouse.guestHouse.guestHouseName}
                loading="lazy"
                id={guestHouse.guestHouse.uid}
                name={guestHouse.guestHouse.guestHouseName}
              />
              <ImageListItemBar title={guestHouse.guestHouse.guestHouseName} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <div ref={bottomRef} />
    </Box>
  );
}
