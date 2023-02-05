import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import SpotInfo from '../../components/staffPickDetailComponent/SpotInfo';
import ReviewContent from '../../components/staffPickDetailComponent/ReviewContent';
import MapApi from '../../components/mapApi/MapApi';
// import { getReview } from '../../api/staffPick';
// import { useState } from 'react';

export default function StaffPickDetail() {
  // 여기서 useEffect로 url 끝 번호를 따서
  // 글 번호로 axios 요청보내서 글 디테일 정보 받아와야함
  const location = useLocation();
  const pageId = location.pathname.split('detail/')[1];

  // 여기 아래로 처음 렌더링시 리뷰 정보 받아오는 로직
  // 여기 내용을 props로 content 컴포넌트로 내려줘야함
  // const [review, setReview] = useState([]);
  // const getReviewDetail = async (uid) => {
  //   const review = await getReview(uid);
  //   setReview(review);
  // };
  useEffect(() => {
    console.log(pageId);
    // getReviewDetail(pageId);
  }, [pageId]);

  const spots = [{ id: 1, lat: 33.4485, lng: 126.5631 }];
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <WhiteBox cpn={<SpotInfo />} />
          </Grid>
          <Grid item xs={12}>
            <WhiteBox cpn={<MapApi spots={spots} startSpot={spots} />} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <WhiteBox cpn={<ReviewContent />} />
        </Grid>
      </Grid>
    </Box>
  );
}
