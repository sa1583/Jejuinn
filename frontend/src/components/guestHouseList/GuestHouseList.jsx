import { Box } from '@mui/system';
import { data } from '../../practiceApi/guestHouseList';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';

export default function GuestHouseList({ selectGuestHouse }) {
  return (
    <Box sx={{ padding: '4vh' }}>
      <h3 style={{ marginTop: '0' }}>
        <span style={{ color: '#FF7600' }}>{data.length}건</span>의 검색결과
      </h3>
      <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {data.map((item) => (
            <ImageListItem key={uuidv4()}>
              <img
                src={`${item.img_url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
                id={item.uid}
                onClick={selectGuestHouse}
                name={item.name}
              />
              <ImageListItemBar
                title={item.name}
                subtitle={<span>따봉따따봉</span>}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
