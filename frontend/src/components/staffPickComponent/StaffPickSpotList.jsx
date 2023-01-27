import { Box } from '@mui/system';
import { data } from '../../practiceApi/staffPickList';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { getSpots } from '../../api/staffPick';
// import { useState } from 'react';

export default function StaffPickSpotList() {
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`detail/${id}`);
  };

  // 나중에 여기서 받아온 data를 map 돌려서 리스트 출력해야함
  // const [spotList, setSpotList] = useState({});
  // const getSpotList = () => {
  //   return async () => {
  //     try {
  //       const { data } = (await getSpots).data;
  //       setSpotList(data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  // };

  return (
    <Box sx={{ padding: '3vh' }}>
      <h2>
        <span style={{ color: '#FF7600' }}>{data.length}건</span>의 검색결과
      </h2>
      <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {data.map((item) => (
            <ImageListItem key={uuidv4()}>
              <img
                src={`${item.img_url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                onClick={() => goDetail(item.id)}
              />
              <ImageListItemBar title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
