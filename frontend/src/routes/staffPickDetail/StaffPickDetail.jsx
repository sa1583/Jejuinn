import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import SpotInfo from '../../components/staffPickDetailComponent/SpotInfo';
import ReviewContent from '../../components/staffPickDetailComponent/ReviewContent';
import MapApi from '../../components/mapApi/MapApi';
import { getReviewDetail, getSpotInfo } from '../../api/staffPick';
// import { getReview } from '../../api/staffPick';
// import { useState } from 'react';

export default function StaffPickDetail() {
  // 리뷰 컨텐츠 내용
  const location = useLocation();
  const pageId = location.pathname.split('detail/')[1];

  const [reviewContent, setReviewContent] = useState([]);
  const getReviewContent = async () => {
    const data = (await getReviewDetail(pageId)).data;
    setReviewContent(data);
  };

  useEffect(() => {
    getReviewContent();
  }, []);

  // 명소 디테일 정보
  const [spotInfo, setSpotInfo] = useState([]);

  const getSpotdetail = async () => {
    const data = (await getSpotInfo(pageId)).data.travelPlace;
    setSpotInfo(data);

    setSpots([{ id: data.uid, lat: data.lat, lng: data.lng }]);
  };

  // 명소 좌표 정보
  const [spots, setSpots] = useState([]);

  useState(() => {
    getSpotdetail();
  }, []);

  // const spots = [{ id: 1, lat: 33.4485, lng: 126.5631 }];
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <WhiteBox cpn={<SpotInfo spotInfo={spotInfo} />} />
            </Grid>
            <Grid item xs={12}>
              <WhiteBox cpn={<MapApi spots={spots} startSpot={spots} />} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <WhiteBox cpn={<ReviewContent reviewContent={reviewContent} />} />
        </Grid>
      </Grid>
    </Box>
  );
}
