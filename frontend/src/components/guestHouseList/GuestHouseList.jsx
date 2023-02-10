import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';

export default function GuestHouseList({ guestHouses }) {
  const navigate = useNavigate();
  const goDetail = (guestHouseUid) => {
    navigate(`detail/${guestHouseUid}`);
  };

  return (
    <Box sx={{ padding: '4vh' }}>
      <h3 style={{ marginTop: '0' }}>
        <span style={{ color: '#FF7600' }}>{guestHouses.length}건</span>의
        검색결과
      </h3>
      <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {guestHouses.map((guestHouse) => (
            <ImageListItem
              key={uuidv4()}
              onClick={() => goDetail(guestHouse.guestHouse.uid)}
            >
              <img
                src={`${images.defalut_url}${guestHouse.images[0]?.imgPath}?w=248&fit=crop&auto=format`}
                srcSet={`${guestHouse.images[0]?.imgPath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={guestHouse.guestHouse.guestHouseName}
                loading="lazy"
                id={guestHouse.guestHouse.uid}
                name={guestHouse.guestHouse.guestHouseName}
              />
              s
              <ImageListItemBar title={guestHouse.guestHouse.guestHouseName} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
