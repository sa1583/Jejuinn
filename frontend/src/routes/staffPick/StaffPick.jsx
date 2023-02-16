import { useEffect, useState } from 'react';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickFilter from '../../components/staffPickComponent/StaffPickFilter';
import StaffPickSpotList from '../../components/staffPickComponent/StaffPickSpotList';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import StaffPickReviews from '../../components/staffPickComponent/StaffPickReviews';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getSpotsPin,
  getSpotsImg,
  getSpotInfo,
  getSpotsByFilter,
} from '../../api/staffPick';
import StaffPickSpotInfo from '../../components/staffPickComponent/StaffPickSpotInfo';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../store/user';
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

  const islogined = useSelector(selectIsLogin);
  const goCreate = () => {
    !islogined
      ? alert('로그인이 필요합니다.')
      : navigate('/staffpicklist/create');
  };

  const actions = [
    { icon: <ModeEditOutlinedIcon />, name: '리뷰 작성', handle: goCreate },
  ];

  // spots 정보 저장할 함수
  const [spots, setSpots] = useState([]);

  //놀고먹기 처음 들어갔을 때 전체 명소 리스트 받는 함수
  const getSpotsPins = async () => {
    const SpotsList = (await getSpotsPin()).data;
    setSpots(SpotsList);
  };

  // 명소 정보 받아오기
  const [selectedSpot, setSelectedSpot] = useState({
    uid: '',
    name: '',
    address: '',
    starRatingAvg: 0,
  });

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
    if (pageId) {
      selectSpot();
    }
  }, [pageId]);

  const [spotImgs, setSpotImgs] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const getNextSpotImgs = async () => {
    const data = (await getSpotsImg(pageNum)).data.content;
    setSpotImgs((prev) => prev.concat(data));
  };

  useEffect(() => {
    getNextSpotImgs();
  }, [pageNum]);

  const plusPageNum = () => {
    setPageNum((prev) => prev + 1);
  };
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
      {islogined && <SpeedDialComponent actions={actions} />}

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
                high={'23rem'}
              />
            }
          />
        </Grid>

        {pageId && (
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                direction: 'row',
                justifyContent: 'space-between',
              }}
            >
              <p
                style={{
                  color: '#FF7600',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  paddingTop: '2vh',
                  paddingLeft: '10px',
                }}
              >
                | {selectedSpot.name}
              </p>
              <ArrowBackIcon
                onClick={() => {
                  navigate('/staffpicklist');
                }}
                sx={{
                  cursor: 'pointer',
                  color: '#FF7600',
                  paddingTop: '4.5vh',
                  paddingRight: '5px',
                }}
                fontSize="large"
              />
            </Box>
          </Grid>
        )}
        {pageId && (
          <Grid item xs={4} style={{ paddingTop: 0 }}>
            <WhiteBox cpn={<StaffPickSpotInfo selectedSpot={selectedSpot} />} />
          </Grid>
        )}
        {pageId && (
          <Grid item xs={8} style={{ paddingTop: 0 }}>
            <WhiteBox cpn={<StaffPickReviews spotname={selectedSpot.name} />} />
          </Grid>
        )}
        {!pageId && (
          <Grid item xs={12} md={12}>
            <StaffPickSpotList
              spotImgs={spotImgs}
              plusPageNum={() => plusPageNum()}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
