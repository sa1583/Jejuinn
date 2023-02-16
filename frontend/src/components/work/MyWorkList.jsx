import { useSelector } from 'react-redux';
import { selectUserInfo, selectAccessToken } from '../../store/user';
import { getMyGuestHouses } from '../../api/guestHouse';
import { getMyWorks, getMyRecruitments } from '../../api/work';
import { useState } from 'react';
import { SelectGusetHousePopover } from '../work/WorkWriteForms';
import { Grid, Button } from '@mui/material';
import WhiteBox from '../whiteBox/WhiteBox';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MyWorkDetail from './MyWorkDetail';
import { useNavigate } from 'react-router-dom';

export default function MyWorkList() {
  const navigate = useNavigate();
  const userUid = useSelector(selectUserInfo).uid;
  const token = useSelector(selectAccessToken);

  const [myWorks, setMyworks] = useState([]);
  const [myGuestHouses, setMyGuestHouses] = useState([]);

  const onSelect = (input) => {
    Recruitment(input);
  };

  const OnClick = () => {
    Recruitment(myGuestHouses[0].uid);
  };

  async function Recruitment(ghUid) {
    const huoseRecruitment = (await getMyRecruitments(ghUid)).data;
    huoseRecruitment.length === 0
      ? navigate(`/recruitment/create/${ghUid}`)
      : navigate(`/work/create/${huoseRecruitment[0].uid}/${ghUid}`);
  }

  async function setHouseAndWork() {
    const myGuestHousesFromServer = (await getMyGuestHouses(token, userUid))
      .data;
    if (myGuestHousesFromServer.length > 0) {
      setMyGuestHouses((prevArray) => [
        ...prevArray,
        ...myGuestHousesFromServer,
      ]);
      myGuestHousesFromServer?.map((myGuestHouse) => {
        getWorks(myGuestHouse.uid);
      });
    }
  }

  async function getWorks(ghuid) {
    const myworks = (await getMyWorks(token, ghuid)).data;
    setMyworks((prevArray) => [...prevArray, ...myworks]);
  }

  useEffect(() => {
    setHouseAndWork();
  }, []);

  return (
    <>
      {myGuestHouses.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item md={12}>
            <h2>나의 채용공고</h2>
            {myGuestHouses.length > 1 ? (
              <SelectGusetHousePopover
                myGuestHouses={myGuestHouses}
                onSelect={onSelect}
              />
            ) : (
              <Button onClick={OnClick}>+</Button>
            )}
          </Grid>

          {myWorks?.map((myWork) => (
            <Grid item md={4} key={uuidv4()}>
              <WhiteBox cpn={<MyWorkDetail work={myWork} />} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </>
  );
}
