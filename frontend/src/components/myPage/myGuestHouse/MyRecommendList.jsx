import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAccessToken } from '../../../store/user';
import { Box, Backdrop, CircularProgress, Stack } from '@mui/material';
import WhiteBox from '../../whiteBox/WhiteBox';
import MyApplicantCom from './MyApplicantCom';
import { getRecommandedList } from '../../../api/recommand';

export default function MyRecommendList() {
  const access_token = useSelector(selectAccessToken);
  const location = useLocation();
  const workUid = location.pathname.split('recommendlist/')[1];

  const [myRecommends, setMyRecommends] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMyRecommends() {
    const { data } = await getRecommandedList(workUid);
    console.log(data);
    setMyRecommends(data);
    setLoading(false);
  }

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
          <Stack direction="column" spacing={2} alignItems="center">
            <CircularProgress
              sx={{
                color: 'grey',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                display: !loading && 'none',
              }}
            />
            {myRecommends.map((myApplicant) => {
              return (
                <WhiteBox
                  key={myApplicant.uid}
                  cpn={<MyApplicantCom myApplicant={myApplicant} />}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
