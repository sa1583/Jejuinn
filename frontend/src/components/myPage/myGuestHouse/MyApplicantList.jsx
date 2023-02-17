import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectAccessToken } from '../../../store/user';
import { Box, Modal, Stack } from '@mui/material';
import MyApplicantCom from './MyApplicantCom';
import { myApplicantList } from '../../../api/guestHouse';
import MyApplicantDetail from './MyApplicantDetail';
import WhiteBox from '../../whiteBox/WhiteBox';

export default function MyApplicantList() {
  const access_token = useSelector(selectAccessToken);
  const location = useLocation();
  const workUid = location.pathname.split('applicantlist/')[1];

  const [myApplicants, setMyApplicants] = useState([]);
  const [open, setOpen] = useState(false);
  const [resumeUid, setResumeUid] = useState();

  const handleOpenModal = (resumeUid) => {
    setOpen(true);
    setResumeUid(resumeUid);
  };

  const handleCloseModal = () => setOpen(false);

  const findUserIndex = () => {
    let index;
    myApplicants.forEach((elem, idx) => {
      if (elem.resumeInfoUid === resumeUid) {
        index = idx;
      }
    });
    return index;
  };

  const handlePrev = () => {
    let index = findUserIndex();
    if (index === 0) index = myApplicants.length - 1;
    else index = index - 1;
    setResumeUid(myApplicants[index].resumeInfoUid);
  };

  const handleForward = () => {
    let index = findUserIndex();
    if (index === myApplicants.length - 1) index = 0;
    else index = index + 1;
    setResumeUid(myApplicants[index].resumeInfoUid);
  };

  async function getMyApplicants() {
    const { data } = await myApplicantList(access_token, workUid);
    setMyApplicants(data);
  }

  useEffect(() => {
    getMyApplicants();
  }, []);

  return (
    <div>
      <Box sx={{ paddingX: '4vh', paddingY: '2vh', paddingBottom: '50px' }}>
        <h1 style={{ fontSize: '1.8rem', paddingBottom: '15px' }}>
          지원자 목록
        </h1>
        <Stack direction="column" spacing={2}>
          {myApplicants &&
            myApplicants?.map((myApplicant) => {
              return (
                <Box
                  key={myApplicant.uid}
                  onClick={() => handleOpenModal(myApplicant.resumeInfoUid)}
                  sx={{ cursor: 'pointer' }}
                  width="100%"
                >
                  <WhiteBox
                    cpn={<MyApplicantCom myApplicant={myApplicant} />}
                  />
                </Box>
              );
            })}
        </Stack>
      </Box>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
