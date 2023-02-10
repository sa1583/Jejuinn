import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';
// import { data } from '../../practiceApi/staffPickList';
// import { useNavigate } from 'react-router-dom';
// import { getSpots } from '../../api/staffPick';
// import { useState } from 'react';

export default function StaffPickSpotList({
  selectSpot,
  spotImgs,
  getNextSpotImgs,
}) {
  const navigate = useNavigate();
  const goReviews = (e) => {
    navigate(`/staffpicklist/${e.target.id}`);
  };
  console.log(spotImgs);
  return (
    <Box sx={{ padding: '3vh' }}>
      <h2>
        <span style={{ color: '#FF7600' }}>{spotImgs.length}개</span>의 명소
      </h2>
      {/* <Box sx={{ width: '100%', maxHeight: '60rem', overflowY: 'scroll' }}> */}
      <Box sx={{ width: '100%' }}>
        <ImageList variant="masonry" cols={4} gap={8}>
          {spotImgs.map((item) => (
            <ImageListItem key={uuidv4()}>
              <img
                src={`${images.defalut_url}${item.mainImgPath}?w=248&fit=crop&auto=format`}
                srcSet={`${item.mainImgPath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="관광지"
                loading="lazy"
                id={item.travelPlaceUid}
                onClick={(e) => {
                  goReviews(e);
                }}
                // name={item.travelPlaceName}
              />
              <ImageListItemBar title={item.travelPlaceName} />
            </ImageListItem>
          ))}
        </ImageList>
        <Button
          variant="contained"
          onClick={getNextSpotImgs}
          sx={{ width: '100%', fontWeight: 'bolder', fontSize: '1rem' }}
        >
          명소 더 가져오기
        </Button>
      </Box>
    </Box>
  );
}
