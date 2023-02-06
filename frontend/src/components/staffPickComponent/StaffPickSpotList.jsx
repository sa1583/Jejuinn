import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useEffect, useState } from 'react';
import { images } from '../../assets/images';
// import { data } from '../../practiceApi/staffPickList';
// import { useNavigate } from 'react-router-dom';
// import { getSpots } from '../../api/staffPick';
// import { useState } from 'react';

export default function StaffPickSpotList({ selectSpot, spotImgs }) {
  // const navigate = useNavigate();
  // const goDetail = (id) => {
  //   navigate(`detail/${id}`);
  // };

  // 나중에 여기서 받아온 data를 map 돌려서 리스트 출력해야함

  // useEffect(() => {}, [spotImgs]);
  console.log(spotImgs);
  // const [imgs, setImgs] = useState([])

  // useEffect(()=> {
  //   setImgs(spotImgs)
  // },[spotImgs])

  return (
    <Box sx={{ padding: '3vh' }}>
      <h2>
        <span style={{ color: '#FF7600' }}>{spotImgs.length}건</span>의 명소
      </h2>
      <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'scroll' }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {spotImgs.map((item) => (
            <ImageListItem key={uuidv4()}>
              <img
                src={`${images.defalut_url}${item.mainImgPath}?w=248&fit=crop&auto=format`}
                srcSet={`${item.mainImgPath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="관광지"
                loading="lazy"
                id={item.travelPlaceUid}
                onClick={selectSpot}
                // name={item.name}
              />
              {/* <ImageListItemBar title={item.name} /> */}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
