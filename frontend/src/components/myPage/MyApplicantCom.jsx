import * as React from 'react';
import { Box, Modal } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { images } from '../../assets/images';
import MyApplicantDetail from './MyApplicantDetail';

export default function MyStaff({ myApplicant }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingX: '2vh',
        }}
        onClick={handleOpen}
      >
        <Avatar
          sx={{ width: '3rem', height: '3rem', marginRight: '10px' }}
          alt="image"
          src={images.sample_profile}
        />
        <h3 style={{ margin: '1vh' }}>{myApplicant.name}</h3>
        <p style={{ padding: '1vh' }}>
          {myApplicant.gender} | {myApplicant.age}
        </p>
        <Box
          sx={{
            display: 'inline',
            padding: '5px 10px',
            margin: '1vh',
            color: 'white',
            backgroundColor: '#FF7600',
            borderRadius: '39px',
            boxShadow: '0px 2px 74px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          {myApplicant.tags}
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MyApplicantDetail id={myApplicant.uid} />
      </Modal>
    </>
  );
}
