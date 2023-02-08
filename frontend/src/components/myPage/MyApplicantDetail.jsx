import React, { useEffect } from 'react';
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
import { getApplicantByUid } from '../../api/guestHouse';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/user';

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
  // const [myApplicant, setMyApplicant] = React.useState();
  const accessToken = useSelector(selectAccessToken);

  // useEffect(() => {
  //   console.log(accessToken);
  //   const applicant = async () => await getApplicantByUid(id, accessToken);
  //   setMyApplicant(applicant);
  // }, []);
  const myApplicant = {
    uid: 9,
    userUid: 1,
    content: '즐겁게 일할 수 있어요',
    possibleStartDate: '2023-02-15',
    minWorkPeriod: 4,
    autoApply: true,
    guestHouseType: null,
    dateCreated: '2023-02-07',
    interestAreas: [
      {
        areaName: '애월읍',
      },
    ],
    personTypes: [
      {
        type: '꼼꼼',
      },
    ],
    WorkHistory: [],
  };

  return (
    <div>
      {myApplicant ? (
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
                      {myApplicant.personTypes?.map((tag) => {
                        return (
                          <Chip
                            label={'#' + tag.type}
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
                        {myApplicant.guestHouseType ? (
                          myApplicant.guestHouseType?.map((type) => {
                            return (
                              <Chip
                                label={type}
                                sx={{
                                  background: '#FF9B44',
                                  color: 'secondary.main',
                                }}
                              />
                            );
                          })
                        ) : (
                          <Chip
                            label="#전체"
                            sx={{
                              background: '#FF9B44',
                              color: 'secondary.main',
                            }}
                          />
                        )}
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
                        {myApplicant.interestAreas?.map((area) => {
                          return (
                            <Chip
                              label={area.areaName}
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
                    {myApplicant?.staffHistories?.map((history) => {
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
                    <Box
                      width="400px"
                      minHeight="150px"
                      display="flex"
                      alignItems="center"
                    >
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
      ) : null}
    </div>
  );
}
