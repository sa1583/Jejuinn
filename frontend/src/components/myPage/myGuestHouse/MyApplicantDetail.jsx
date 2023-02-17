import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { images } from '../../../assets/images';
import WorkHistory from '../WorkHistory';
import { useLocation, useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import {
  getGuestHouseUidByWorkUid,
  hireStaff,
  sendMessage,
} from '../../../api/guestHouse';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../../store/user';
import { getApplicantDetail } from '../../../api/recommand';
import { getWorkDetail } from '../../../api/work';
import { snedVideoInterviewUrl } from '../../../api/sms';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
};

export default function MyApplicantDetail({
  resumeUid,
  workUid,
  handleCloseModal,
  handlePrev,
  handleForward,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);

  const [applicant, setApplicant] = useState();

  const getGuestHouseUid = async () => {
    const { data } = await getGuestHouseUidByWorkUid(workUid, accessToken);
    return data;
  };

  const sendMessageToApplicant = async () => {
    const guestHouseUid = await getGuestHouseUid();
    await sendMessage(accessToken, guestHouseUid, applicant.writerUid);
  };

  function generateRandomString(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const moveToInterview = async () => {
    const guestHouseUid = await getGuestHouseUid();
    const sessionId = userInfo.uid + '-' + generateRandomString(30);
    const link = `https://jejuinn.com/interview/${sessionId}`;
    await snedVideoInterviewUrl(guestHouseUid, applicant.writerUid, link);
    navigate(`/interview/${sessionId}`);
  };

  const getApplicantDetailInfo = async () => {
    const rid = resumeUid * 1;
    const { data } = await getApplicantDetail(rid, workUid, accessToken);
    setApplicant(data);
  };

  const handleHireStaff = async () => {
    const guestHouseUid = await getGuestHouseUid();
    const { data } = await getWorkDetail(workUid);
    await hireStaff(
      guestHouseUid,
      applicant.writerUid,
      data.workName,
      accessToken,
    );
  };

  useEffect(() => {
    getApplicantDetailInfo();
  }, [resumeUid]);

  return (
    <div>
      {applicant ? (
        <Box sx={style}>
          <Stack direction="row">
            <Stack direction="column" justifyContent="space-between">
              <Box height="105px" />
              <ArrowBackIosNewIcon
                fontSize="large"
                color="primary"
                onClick={handlePrev}
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
                <Stack direction="row" alignItems="center" spacing={4}>
                  <Avatar
                    src={
                      applicant.profileImageUrl
                        ? applicant.profileImageUrl
                        : images.sample_profile
                    }
                    style={{
                      width: '15rem',
                      height: '15rem',
                      marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  />
                  <Box>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Typography
                        component="h2"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '30px',
                          lineHeight: '58px',
                        }}
                      >
                        {applicant.userName ? applicant.userName : '장정민'}
                      </Typography>
                      <Typography
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '20px',
                        }}
                      >
                        {applicant.gender ? applicant.gender : '남자'} |{' '}
                        {applicant.age ? applicant.age : 20}세
                      </Typography>
                      <a href={applicant.instagramLink}>
                        <img src={images.instagram_logo} width="39px" />
                      </a>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {applicant.personTypes?.map((tag) => {
                        return (
                          <Chip
                            label={'#' + tag.type}
                            sx={{
                              background: '#FF7600',
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
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        marginTop="15px"
                      >
                        <Typography
                          style={{
                            marginRight: '7px',
                            fontSize: '18px',
                          }}
                        >
                          선호 스타일
                        </Typography>
                        {applicant.guestHouseTypes ? (
                          applicant.guestHouseTypes?.map((type) => {
                            return (
                              <Chip
                                label={'#' + type}
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
                          marginRight: '30px',
                          fontSize: '18px',
                        }}
                      >
                        선호 지역
                      </Typography>
                      <Stack direction="row" spacing={1} display="inline">
                        <Chip
                          label={'#' + applicant.interestArea}
                          sx={{
                            background: '#FF9B44',
                            color: 'secondary.main',
                          }}
                        />
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
                          marginRight: '15px',
                          fontSize: '18px',
                        }}
                      >
                        입도 가능일
                      </Typography>
                      <Chip
                        width="90%"
                        icon={<CalendarMonthIcon color="white" />}
                        sx={{ background: '#FF9B44', color: 'white' }}
                        label={applicant.possibleStartDate}
                      />
                    </Box>
                  </Box>
                </Stack>
                <Box marginTop="30px">
                  <Stack direction="row" justifyContent="center" spacing={8}>
                    <Typography
                      sx={{
                        fontSize: '20px',
                        display: 'inline',
                      }}
                    >
                      자기 소개
                    </Typography>
                    <Box width="400px" display="flex" alignItems="center">
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        color="primary"
                        focused
                        inputProps={{
                          readOnly: true,
                        }}
                        value={applicant.content}
                      />
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    marginTop: '30px',
                    marginX: '20px',
                  }}
                >
                  <Stack direction="row" spacing={8} minHeight="150px">
                    <Typography
                      sx={{
                        fontSize: '20px',
                        display: 'inline',
                        marginLeft: '12px',
                      }}
                    >
                      근무 이력
                    </Typography>
                    {applicant?.staffRecordDetail?.map((history) => {
                      if (history.onDuty === 'true') return null;
                      return (
                        <WorkHistory key={history.uid} history={history} />
                      );
                    })}
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
                      sx={{
                        height: '3rem',
                        fontSize: '1.6vh',
                        fontColor: 'white',
                        borderRadius: '50px',
                        width: '205px',
                        '&:hover': {
                          background: '#FF7600',
                        },
                      }}
                      onClick={sendMessageToApplicant}
                    >
                      문자 보내기
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        height: '3rem',
                        fontSize: '1.6vh',
                        fontColor: 'white',
                        borderRadius: '50px',
                        width: '205px',
                        '&:hover': {
                          background: '#FF7600',
                        },
                      }}
                      onClick={moveToInterview}
                    >
                      화상 면접
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        background: 'primary.main',
                        borderRadius: '25px',
                        width: '205px',
                      }}
                      onClick={handleHireStaff}
                    >
                      채용
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
                  onClick={handleCloseModal}
                />
              </Box>
              <ArrowForwardIosIcon
                color="primary"
                fontSize="large"
                onClick={handleForward}
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
