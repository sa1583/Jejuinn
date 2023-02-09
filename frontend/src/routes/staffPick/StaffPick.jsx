import { useEffect, useState } from 'react';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickFilter from '../../components/staffPickComponent/StaffPickFilter';
import StaffPickSpotList from '../../components/staffPickComponent/StaffPickSpotList';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import StaffPickReviews from '../../components/staffPickComponent/StaffPickReviews';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getSpotsPin,
  getSpotsImg,
  getSpotInfo,
  getSpotsByFilter,
} from '../../api/staffPick';
import StaffPickSpotInfo from '../../components/staffPickComponent/StaffPickSpotInfo';
export default function StaffPick() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageId = location.pathname.split('staffpicklist/')[1];

  const [pickForm, setPickForm] = useState({
    category: '전체',
    areaName: '전체',
    word: '',
  });
  const handlePickForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPickForm({ ...pickForm, [name]: value });
  };

  const getFilterdSpots = async () => {
    const data = (await getSpotsByFilter(pickForm)).data.content;
    setSpots(data);
  };

  const goCreate = () => {
    navigate('/staffpicklist/create');
  };

  const actions = [
    { icon: <ModeEditOutlinedIcon />, name: '글 작성', handle: goCreate },
  ];

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
  const [pageNum, setPageNum] = useState(1);

  const getSpotsImgs = async () => {
    const data = (await getSpotsImg(pageNum)).data.content;
    setPageNum((prev) => prev + 1);
    console.log(data);
    // setSpotImgs(data);
    setSpotImgs((prev) => prev.concat(data));
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
  };

  // 클릭한 마커의 명소 디테일 보기
  const handlePinClick = (marker) => {
    navigate(`/staffpicklist/${marker.id}`);
  };

  useEffect(() => {
    // if (!pageId) {
    getSpotsPins();
    // }
  }, []);
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

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <SpeedDialComponent actions={actions} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <WhiteBox
            cpn={
              <StaffPickFilter
                pickForm={pickForm}
                handlePickForm={handlePickForm}
                getFilterdSpots={getFilterdSpots}
              />
            }
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <WhiteBox
            cpn={
              <MapApi
                spots={spots}
                handlePinClick={handlePinClick}
                pickedId={pageId}
              />
            }
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
      </Grid>
    </Box>
  );
}
