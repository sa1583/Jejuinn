import { Box, Chip, Modal, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { images } from '../../../assets/images';
import { useEffect, useState } from 'react';

export default function MyApplicantCom({ myApplicant }) {
  return (
    <>
      <Stack direction="row" alignItems="center" p="20px">
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
    </>
  );
}
