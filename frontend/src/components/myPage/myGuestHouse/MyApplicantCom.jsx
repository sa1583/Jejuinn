import { Box, Chip, Modal, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { images } from '../../../assets/images';
import MyApplicantDetail from './MyApplicantDetail';
import { useEffect, useState } from 'react';

export default function MyApplicantCom({ myApplicant, applicantList }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [modalApplicant, setModalApplicant] = useState(myApplicant);

  const size = applicantList.length;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePrev = () => {
    console.log('prev');
    setIndex((prev) => {
      if (prev === 0) {
        return size - 1;
      } else {
        return prev - 1;
      }
    });
  };

  const handleForward = () => {
    console.log('forward');
    setIndex((prev) => {
      if (prev === size - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  useEffect(() => {
    applicantList.find((elem, idx) => {
      if (elem.userUid === myApplicant.uid) {
        setIndex(idx);
        return;
      }
    });
  }, []);

  useEffect(() => {
    setModalApplicant(applicantList[index]);
  }, [index]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        p="20px"
        onClick={handleOpen}
        sx={{ cursor: 'pointer' }}
      >
        <Avatar
          sx={{ width: '3rem', height: '3rem', marginRight: '10px' }}
          alt="image"
          src={images.sample_profile}
        />
        <Typography minWidth="70px" mx="10px" variant="h6">
          {myApplicant.userName}
        </Typography>
        <Typography minWidth="100px" mx="10px" variant="h6">
          {myApplicant.gender} | {myApplicant.age}
        </Typography>
        <Stack direction="row" spacing={1}>
          {myApplicant.personTypes.map((tag) => {
            return <Chip label={'#' + tag.type} color="primary" />;
          })}
        </Stack>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MyApplicantDetail
          myApplicant={modalApplicant}
          handleClose={handleClose}
          handlePrev={handlePrev}
          handleForward={handleForward}
        />
      </Modal>
    </>
  );
}
