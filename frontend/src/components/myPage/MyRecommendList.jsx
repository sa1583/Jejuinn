import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAccessToken } from '../../store/user';
import { Box } from '@mui/material';
import WhiteBox from '../whiteBox/WhiteBox';
import MyApplicantCom from './MyApplicantCom';
import { myRecommendList } from '../../api/guestHouse';

export default function MyRecommendList() {
  const access_token = useSelector(selectAccessToken);
  const location = useLocation();
  const workUid = location.pathname.split('recommendlist/')[1];

  const [myRecommends, setMyRecommends] = useState([]);
  async function getMyRecommends() {
    const data = await myRecommendList(access_token, workUid);
    console.log(data);
    setMyRecommends(data);
  }

  // const myApplicants = [
  //   {
  //     uid: '1',
  //     userUid: '5',
  //     name: '장정민',
  //     age: '23',
  //     tags: '#활발 #유쾌',
  //     gender: '남자',
  //   },
  //   {
  //     uid: '2',
  //     userUid: '6',
  //     name: '최다은',
  //     age: '24',
  //     tags: '#꼼꼼 #성실',
  //     gender: '여자',
  //   },
  // ];

  useEffect(() => {
    getMyRecommends();
  }, []);

  return (
    <div>
      <Box sx={{ paddingX: '4vh', paddingY: '2vh', paddingBottom: '50px' }}>
        <h1 style={{ fontSize: '1.8rem', paddingBottom: '15px' }}>
          추천스탭 목록
        </h1>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* {myApplicants.map((myApplicant) => {
              return (
                <WhiteBox
                  key={myApplicant.uid}
                  cpn={<MyApplicantCom myApplicant={myApplicant} />}
                />
              );
            })} */}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
