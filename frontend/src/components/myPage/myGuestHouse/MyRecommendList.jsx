import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAccessToken } from '../../../store/user';
import {
  Box,
  Backdrop,
  CircularProgress,
  Stack,
  Modal,
  Divider,
} from '@mui/material';
import WhiteBox from '../../whiteBox/WhiteBox';
import MyApplicantCom from './MyApplicantCom';
import { getRecommandedList } from '../../../api/recommand';
import MyApplicantDetail from './MyApplicantDetail';

export default function MyRecommendList({ guestHouseUid }) {
  const access_token = useSelector(selectAccessToken);
  const location = useLocation();
  const workUid = location.pathname.split('recommendlist/')[1];

  const [loading, setLoading] = useState(true);
  const [myRecommends, setMyRecommends] = useState([]);
  const [open, setOpen] = useState(false);
  const [resumeUid, setResumeUid] = useState();

  const handleOpenModal = (uid) => {
    setOpen(true);
    setResumeUid(uid);
  };

  const handleCloseModal = () => setOpen(false);

  const findUserIndex = () => {
    let index;
    myRecommends.forEach((elem, idx) => {
      if (elem.resumeInfoUid === resumeUid) {
        index = idx;
      }
    });
    return index;
  };

  const handlePrev = () => {
    let index = findUserIndex();
    if (index === 0) index = myRecommends.length - 1;
    else index = index - 1;
    setResumeUid(myRecommends[index].resumeInfoUid);
  };

  const handleForward = () => {
    let index = findUserIndex();
    if (index === myRecommends.length - 1) index = 0;
    else index = index + 1;
    setResumeUid(myRecommends[index].resumeInfoUid);
  };

  async function getMyRecommends() {
    const { data } = await getRecommandedList(workUid);
    setMyRecommends(data);
    setLoading(false);
  }

  useEffect(() => {
    getMyRecommends();
  }, []);

  return (
    <div>
      <Box sx={{ paddingX: '4vh', paddingY: '2vh', paddingBottom: '50px' }}>
        <h1 style={{ fontSize: '1.7rem', marginBottom: '2rem' }}>
          추천스탭 목록
        </h1>
        <Divider sx={{ marginBottom: '7px' }} />
        <br />
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <CircularProgress
              sx={{
                color: 'grey',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                display: !loading && 'none',
              }}
            />
            {myRecommends.map((myApplicant) => {
              return (
                <Box
                  key={myApplicant.uid}
                  onClick={() => handleOpenModal(myApplicant.resumeInfoUid)}
                  sx={{ cursor: 'pointer', width: '100%' }}
                >
                  <Box
                    sx={{
                      borderRadius: '50px',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                      background: '#FFFFFF',
                    }}
                  >
                    <MyApplicantCom myApplicant={myApplicant} />
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Box>
      <Modal open={open} onClose={handleCloseModal}>
        <MyApplicantDetail
          resumeUid={resumeUid}
          workUid={workUid}
          handleCloseModal={handleCloseModal}
          handlePrev={handlePrev}
          handleForward={handleForward}
        />
      </Modal>
    </div>
  );
}
