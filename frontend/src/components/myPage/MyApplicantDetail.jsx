import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SendSMS from '../sendSMS/SendSMS';
import { images } from '../../assets/images';
import WorkHistory from './WorkHistory';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '39px',
};

export default function MyApplicantDetail({ id, handleClose }) {
  const navigate = useNavigate();
  const myApplicant = {
    uid: '1',
    userUid: '5',
    name: '장정민',
    age: '23',
    gender: '남자',
    content:
      '일 잘합니다 뽑아주세요dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    possibleStartDate: '2023-01-20',
    minimunWorkingPeriod: '1달 이상',
    dateCreated: '2023-01-19',
    tags: ['#활발', '#유쾌'],
    guestHouseType: ['#파티', '#수영장', '#술'],
    instagramLink: 'www.naver.com',
    interestArea: ['애월읍', '함덕읍'],
    staffHistories: [
      {
        uid: '3',
        guestHouseUid: '4',
        guestHouseName: '김군게스트하우스',
        startDate: '2022-12-10',
        endDate: '2023-01-20',
        onDuty: 'false',
        workName: '리셉션',
      },
      {
        uid: '2',
        guestHouseUid: '5',
        guestHouseName: '게토게스트하우스',
        startDate: '2022-9-10',
        endDate: '2023-11-20',
        onDuty: 'false',
        workName: '청소',
      },
    ],
  };

  return (
    <div>
      <Box sx={style}>
        <Stack direction="row">
          <Stack direction="column" justifyContent="space-between">
            <Box height="105px" />
            <ArrowBackIosNewIcon
              fontSize="large"
              color="primary"
              sx={{
                transform: 'scaleY(1.5)',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
            />
            <Box height="105px" />
          </Stack>
          <Box margin="60px" width="fit-content">
            <Stack direction="column" spacing={3}>
              <Stack direction="row" spacing={1}>
                <Avatar
                  src={images.sample_profile}
                  style={{
                    width: '15rem',
                    height: '15rem',
                    marginBottom: '20px',
                    cursor: 'pointer',
                  }}
                />
                <Box>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Typography
                      component="h2"
                      style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '48px',
                        lineHeight: '58px',
                      }}
                    >
                      {myApplicant.name}
                    </Typography>
                    <Typography
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '300',
                        fontSize: '32px',
                      }}
                    >
                      {myApplicant.gender} | {myApplicant.age}
                    </Typography>
                    <a href={myApplicant.instagramLink}>
                      <img src={images.instagram_logo} width="39px" />
                    </a>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    marginLeft="20px"
                    marginTop="10px"
                  >
                    {myApplicant.tags.map((tag) => {
                      return (
                        <Chip
                          label={tag}
                          sx={{
                            background: '#FF9B44',
                            color: 'secondary.main',
                          }}
                        />
                      );
                    })}
                  </Stack>
                  <Box
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <Typography
                      style={{
                        display: 'inline',
                        marginLeft: '20px',
                        marginRight: '30px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '100',
                        fontSize: '20px',
                        lineHeight: '29px',
                      }}
                    >
                      선호 스타일
                    </Typography>
                    <Stack direction="row" spacing={1} display="inline">
                      {myApplicant.guestHouseType.map((type) => {
                        return (
                          <Chip
                            label={type}
                            sx={{
                              background: '#FF9B44',
                              color: 'secondary.main',
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <Typography
                      style={{
                        display: 'inline',
                        marginLeft: '20px',
                        marginRight: '51px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '100',
                        fontSize: '20px',
                        lineHeight: '29px',
                      }}
                    >
                      선호 지역
                    </Typography>
                    <Stack direction="row" spacing={1} display="inline">
                      {myApplicant.guestHouseType.map((type) => {
                        return (
                          <Chip
                            label={type}
                            sx={{
                              background: '#FF9B44',
                              color: 'secondary.main',
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                  <Box
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <Typography
                      style={{
                        display: 'inline',
                        marginLeft: '20px',
                        marginRight: '31px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '100',
                        fontSize: '20px',
                        lineHeight: '29px',
                      }}
                    >
                      입도 가능일
                    </Typography>
                    <Chip
                      icon={<CalendarMonthIcon color="white" />}
                      sx={{ background: '#FF9B44', color: 'white' }}
                      label={myApplicant.possibleStartDate}
                    />
                  </Box>
                </Box>
              </Stack>
              <Box
                sx={{
                  marginTop: '33px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '30px',
                    display: 'inline',
                  }}
                >
                  근무 이력
                </Typography>
                <Stack direction="row" spacing={1} marginLeft="170px">
                  {myApplicant.staffHistories.map((history) => {
                    if (history.onDuty === 'true') return null;
                    return (
                      <WorkHistory
                        key={history.uid}
                        guestHouseName={history.guestHouseName}
                        startDate={history.startDate}
                        endDate={history.endDate}
                      />
                    );
                  })}
                </Stack>
              </Box>
              <Box marginTop="30px">
                <Stack direction="row" spacing={8}>
                  <Typography
                    sx={{
                      fontSize: '30px',
                      display: 'inline',
                    }}
                  >
                    자기 소개
                  </Typography>
                  <Box width="400px">
                    <TextField
                      fullWidth
                      multiline
                      variant="standard"
                      color="primary"
                      focused
                      inputProps={{
                        readOnly: true,
                      }}
                      value={myApplicant.content}
                    />
                  </Box>
                </Stack>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <Stack direction="row" spacing={5}>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: '25px', width: '205px' }}
                  >
                    <SendSMS />
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background: 'primary.main',
                      borderRadius: '25px',
                      width: '205px',
                    }}
                    onClick={() => navigate('/interview')}
                  >
                    화상 면접
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Stack direction="column" justifyContent="space-between">
            <Box height="80px">
              <CloseIcon
                color="primary"
                sx={{
                  transform: 'scale(2)',
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={handleClose}
              />
            </Box>
            <ArrowForwardIosIcon
              color="primary"
              fontSize="large"
              sx={{
                transform: 'scaleY(1.5)',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
            />
            <Box height="105px" />
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}
