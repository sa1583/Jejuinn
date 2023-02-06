import { useEffect, useState } from 'react';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickFilter from '../../components/staffPickComponent/StaffPickFilter';
import StaffPickSpotList from '../../components/staffPickComponent/StaffPickSpotList';
// import StaffPickRank from '../../components/staffPickComponent/StaffPickRank';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import StaffPickReviews from '../../components/staffPickComponent/StaffPickReviews';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { getReviews } from '../../api/staffPick';
import { getSpotsPin, getSpotsImg, getSpotInfo } from '../../api/staffPick';
import StaffPickSpotInfo from '../../components/staffPickComponent/StaffPickSpotInfo';
export default function StaffPick() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageId = location.pathname.split('staffpicklist/')[1];
  console.log(pageId);

  const [filter, setFilter] = useState({
    type: '전체',
    section: '전체',
    inp: '',
  });

  const getFilter = (pickForm) => {
    setFilter(pickForm);
    // 여기엔 이제 api 통신
  };

  const goCreate = () => {
    navigate('create');
  };

  const testapi = () => {
    // const data = { msg: 'aaaa' };
    axios({
      method: 'post',
      url: 'http://i8a603.p.ssafy.io:8080/api/spot/1',
      // data,
    }).then(console.log);
  };

  const actions = [
    { icon: <ModeEditOutlinedIcon />, name: '글 작성', handle: goCreate },
    { icon: <ModeEditOutlinedIcon />, name: '테스트', handle: testapi },
  ];

  // const spots = [
  //   { travelPlaceUid: 1, lat: 33.4485, lng: 126.5631 },
  //   { travelPlaceUid: 2, lat: 33.478, lng: 126.4948 },
  //   { travelPlaceUid: 3, lat: 33.4664, lng: 126.6694 },
  //   { travelPlaceUid: 4, lat: 33.2856, lng: 126.4449 },
  // ];

  // spots 정보 저장할 함수
  const [spots, setSpots] = useState([]);
  /**
   * 놀고먹기 처음 들어갔을 때 전체 명소 리스트 받는 함수
   */
  const getSpotsPins = async () => {
    const SpotsList = (await getSpotsPin()).data;
    setSpots(SpotsList);
  };

  // 명소 이미지 리스트 받아오기
  const [spotImgs, setSpotImgs] = useState([]);

  const getSpotsImgs = async () => {
    const data = (await getSpotsImg()).data.content;
    setSpotImgs(data);
  };

  // 명소 정보 받아오기
  const [selectedSpot, setSelectedSpot] = useState(false);

  // 클릭한 명소의 uid, name을 받고
  // uid를 이용해 해당 명소의 리뷰 리스트를 받아오는 로직
  // 나중에 fetch 우리서버랑 통신으로 바꿔줘야함
  //
  const selectSpot = async () => {
    const data = (await getSpotInfo(pageId)).data.travelPlace;
    setSelectedSpot(data);

    // const uid = e.target.id;
    // const name = e.target.name;
    // setSelectedSpot({ uid, name });
    // fetch(`dataPractice/reviews_${uid}.json`)
    //   .then((res) => res.json())
    //   .then((json) => setSpotReviews(json));
    // 위에 패치 지우고 아래 주석 해제  -> 전체함수 selectSpot 에 async 붙여줘야함
    // const reviews = await getReviews()
    // setSpotReviews(reviews)
  };

  // 클릭한 마커의 명소 디테일 보기
  const handlePinClick = (marker) => {
    navigate(`/staffpicklist/${marker.id}`);
  };

  useEffect(() => {
    if (!pageId) {
      getSpotsPins();
    }
  }, [pageId]);
  useEffect(() => {
    if (!pageId) {
      getSpotsImgs();
    }
  }, [pageId]);

  useEffect(() => {
    if (pageId) {
      selectSpot();
    }
  }, [pageId]);

  // 반응형 안할꺼면 다 xs값에 md값 넣어주면 됨
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <SpeedDialComponent actions={actions} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <WhiteBox
            cpn={<StaffPickFilter getFilter={getFilter} filter={filter} />}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <WhiteBox
            cpn={<MapApi spots={spots} handlePinClick={handlePinClick} />}
          />
        </Grid>

        {pageId && (
          <Grid item xs={4}>
            <WhiteBox cpn={<StaffPickSpotInfo selectedSpot={selectedSpot} />} />
          </Grid>
        )}
        {pageId && (
          <Grid item xs={8}>
            <WhiteBox cpn={<StaffPickReviews spotname={selectedSpot.name} />} />
          </Grid>
        )}
        {!pageId && (
          <Grid item xs={12} md={12}>
            <WhiteBox
              cpn={
                <StaffPickSpotList
                  selectSpot={selectSpot}
                  spotImgs={spotImgs}
                />
              }
            />
          </Grid>
        )}

        {/* </Grid> */}
      </Grid>
    </Box>
  );
}
