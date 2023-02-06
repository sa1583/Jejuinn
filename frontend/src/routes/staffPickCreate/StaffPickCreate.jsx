import { Grid, makeStyles } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import getAddressBySpot from '../../api/map';
import { getSpotInfo, getSpotsPin } from '../../api/staffPick';
import MapApi from '../../components/mapApi/MapApi';
import StaffPickCreateForm from '../../components/staffPickCreateComponent/StaffPickCreateForm';
import StaffPickCreateInfo from '../../components/staffPickCreateComponent/StaffPickCreateInfo';
import StaffPickCreateNewSpot from '../../components/staffPickCreateComponent/StaffPickCreateNewSpot';
import WhiteBox from '../../components/whiteBox/WhiteBox';

export default function StaffPickCreate() {
  const [nowPick, setNowPick] = useState('');
  const [area, setArea] = useState('');

  const [newSpotName, setNewSpotName] = useState('');
  const handleNewSpotName = (e) => {
    setNewSpotName(e.target.value);
  };

  const handlePinClick = async (marker) => {
    setNowPick(marker.id);
    // setNowPick(id에 해당하는 명소 정보 axios로 받아서 리스트로 갱)
    // 그다음에 StaffPickCreateInfo 에서 nowPick에 대한 정보 출력 갱
    const data = (await getSpotInfo(marker.id)).data.travelPlace;
    console.log(data);
    setNowPick(data);
  };

  const [spots, setSpots] = useState([]);
  const getSpotsPins = async () => {
    const SpotsList = (await getSpotsPin()).data;
    setSpots(SpotsList);
  };
  useEffect(() => {
    getSpotsPins();
  }, []);
  // const setNewPin = async (e) => {
  //   const lat = e._lat;
  //   const lng = e._lng;
  //   setNowPick([lat, lng]);
  //   const data = await getAddressBySpot(lng, lat);
  //   const address = data.data.documents[0].address_name;
  //   setArea(address);
  //   setNewSpotName('');
  // };

  // const spots = [
  //   { id: 23, lat: 33.4485, lng: 126.5631 },
  //   { id: 2, lat: 33.478, lng: 126.4948 },
  //   { id: 3, lat: 33.4664, lng: 126.6694 },
  //   { id: 4, lat: 33.2856, lng: 126.4449 },
  //   { id: 5, lat: 10, lng: 10 },
  // ];
  // const [spots, setSpots] = useState(initial);
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12}>
            <WhiteBox cpn={<StaffPickCreateInfo nowPick={nowPick} />} />
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <WhiteBox
            cpn={
              <MapApi
                handlePinClick={handlePinClick}
                spots={spots}
                // setNewPin={setNewPin}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <WhiteBox cpn={<StaffPickCreateForm />} />
        </Grid>
      </Grid>
    </Box>
  );
}

//   <StaffPickCreateNewSpot
//   handleNewSpotName={handleNewSpotName}
//   newSpotName={newSpotName}
//   area={area}
// />
