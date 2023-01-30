import { useState } from 'react';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickFilter from '../../components/staffPickComponent/StaffPickFilter';
import StaffPickSpotList from '../../components/staffPickComponent/StaffPickSpotList';
import StaffPickRank from '../../components/staffPickComponent/StaffPickRank';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import StaffPickReviews from '../../components/staffPickComponent/StaffPickReviews';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import { useNavigate } from 'react-router-dom';
export default function StaffPick() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    type: '전체',
    section: '전체',
    inp: '',
  });

  const getFilter = (pickForm) => {
    setFilter(pickForm);
    // 여기엔 이제 api 통신
  };
  const [selectedSpot, setSelectedSpot] = useState({ uid: '', name: '' });

  const [spotReviews, setSpotReviews] = useState([]);

  // 클릭한 명소의 uid, name을 받고
  // uid를 이용해 해당 명소의 리뷰 리스트를 받아오는 로직
  // 나중에 fetch 우리서버랑 통신으로 바꿔줘야함
  const selectSpot = (e) => {
    const uid = e.target.id;
    const name = e.target.name;
    setSelectedSpot({ uid, name });
    fetch(`dataPractice/reviews_${uid}.json`)
      .then((res) => res.json())
      .then((json) => setSpotReviews(json));
  };

  const deleteSelected = () => {
    setSelectedSpot({ uid: '', name: '' });
    setSpotReviews([]);
  };
  const goCreate = () => {
    navigate('create');
  };
  const actions = [
    { icon: <ModeEditOutlinedIcon />, name: '글 작성', handle: goCreate },
  ];

  // 반응형 안할꺼면 다 xs값에 md값 넣어주면 됨
  return (
    <div>
      <SpeedDialComponent actions={actions} />

      <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <WhiteBox
              cpn={<StaffPickFilter getFilter={getFilter} filter={filter} />}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <WhiteBox cpn={<MapApi />} />
          </Grid>

          <Box
            component={Grid}
            item
            md={4}
            display={{ xs: 'none', md: 'block' }}
          >
            <WhiteBox cpn={<StaffPickRank />} />
          </Box>
          <Grid item xs={12} md={8}>
            <Grid item xs={12} md={12}>
              {spotReviews.length > 0 && (
                <WhiteBox
                  cpn={
                    <StaffPickReviews
                      spotReviews={spotReviews}
                      selectedSpot={selectedSpot}
                      deleteSelected={deleteSelected}
                    />
                  }
                />
              )}
              {spotReviews.length === 0 && (
                <WhiteBox cpn={<StaffPickSpotList selectSpot={selectSpot} />} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
