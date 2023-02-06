import * as React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import SendSMS from '../sendSMS/SendSMS';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function MyApplicantDetail({ id }) {
  const myApplicant = {
    uid: '1',
    userUid: '5',
    name: '장정민',
    age: '23',
    gender: '남자',
    content: '일 잘합니다 뽑아주세요',
    possible_start_date: '2023-01-20',
    minimun_working_period: '1달 이상',
    date_created: '2023-01-19',
    tags: '#활발 #유쾌',
    instagram_link: 'www.naver.com',
    interestArea: ['애월읍', '함덕읍'],
    staffHistories: [
      {
        guestHouseUid: '5',
        guestHouseName: '김군게스트하우스',
        userUid: '5',
        startDate: '2023-01-17',
        endDate: '2023-02-27',
      },
      {
        guestHouseUid: '4',
        guestHouseName: '게토게스트하우스',
        userUid: '5',
        startDate: '2023-12-17',
        endDate: '2023-01-10',
      },
    ],
  };

  return (
    <div>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {myApplicant.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {myApplicant.content}
        </Typography>
        <SendSMS />
      </Box>
    </div>
  );
}
