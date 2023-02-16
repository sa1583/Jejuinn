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
        <Typography
          minWidth="60px"
          mx="10px"
          variant="h6"
          sx={{ fontSize: '20', fontWeight: 'bold', color: '#FF7600' }}
        >
          {myApplicant.userName}
        </Typography>
        <Typography
          minWidth="150px"
          mx="10px"
          variant="h6"
          sx={{ fontSize: '18px ' }}
        >
          {myApplicant.gender} | {myApplicant.age}세
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
