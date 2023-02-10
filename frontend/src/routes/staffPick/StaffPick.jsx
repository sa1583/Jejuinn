import { useEffect, useRef, useState } from 'react';
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
    // console.log(data);
    // setSpotImgs(data);
    setSpotImgs(data);
    setPageNum(2);
  };

  const getNextSpotImgs = async () => {
    const data = (await getSpotsImg(pageNum + 1)).data.content;
    setPageNum((prev) => prev + 1);
    setSpotImgs((prev) => prev.concat(data));
  };

  // 명소 정보 받아오기
  const [selectedSpot, setSelectedSpot] = useState(false);

  const selectSpot = async () => {
    const data = (await getSpotInfo(pageId)).data.travelPlace;
    setSelectedSpot(data);
  };

  // 클릭한 마커의 명소 디테일 보기
  const handlePinClick = (marker) => {
    navigate(`/staffpicklist/${marker.id}`);
  };

  useEffect(() => {
    if (!pageId) {
      getSpotsPins();
    }
  }, []);

  // 이 아래는 무한스크롤 구현 완료되면 지워도 되려나
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

  // const [bottom, setBottom] = useState(null);
  // const bottomObserver = useRef(null);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         console.log(pageNum);
  //       }
  //     },
  //     { threshold: 0.5, rootMargin: '80px' },
  //   );
  //   bottomObserver.current = observer;
  // }, []);

  // useEffect(() => {
  //   const observer = bottomObserver.current;
  //   if (bottom) {
  //     observer.observe(bottom);
  //   }
  //   setPageNum(2);
  //   console.log(1);
  //   return () => {
  //     if (bottom) {
  //       observer.unobserve(bottom);
  //     }
  //   };
  // }, [bottom]);

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
                  getNextSpotImgs={getNextSpotImgs}
                />
              }
            />
          </Grid>
        )}
      </Grid>
      {/* <div ref={setBottom} /> */}
    </Box>
  );
}
