import { Box, styled, Stack, Divider } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import WhiteBox from '../../whiteBox/WhiteBox';
import MyMainArticle from './MyMainArticle';
import MyMainRecruitment from './MyMainRecruitment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  getMyApplyList,
  getMyInterestGuestHouses,
  getMyInterestAttractions,
  getMyReivewList,
} from '../../../api/job';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../store/user';
import MyInterestGuestHouse from './MyInterestGuestHouse';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.1rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function MyMain() {
  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();

  const [isOpened, setIsOpened] = useState(true);
  const [tabNum, setTabNum] = useState('0');
  const [myInterestGuestHouses, setMyInterestGuestHouses] = useState([]);
  const [myLikePlaceList, setMyLikePlaceList] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [myAppliedRecruitment, setMyAppliedRecruitment] = useState([]);

  const handleChangeTab = (event, newValue) => {
    setTabNum(newValue);
  };

  const openClose = () => {
    const prev = isOpened;
    setIsOpened(!prev);
  };

  const loadMyApplyList = async () => {
    const { data } = await getMyApplyList(accessToken);
    setMyAppliedRecruitment(data);
  };

  const loadMyLikeRecruitment = async () => {
    const { data } = await getMyInterestGuestHouses(accessToken);
    setMyInterestGuestHouses(data);
  };

  const loadMyLikePlaceList = async () => {
    const { data } = await getMyInterestAttractions(accessToken);
    setMyLikePlaceList(data);
  };

  const loadMyReveiwList = async () => {
    const { data } = await getMyReivewList(accessToken);
    setMyPosts(data);
  };

  useEffect(() => {
    loadMyApplyList();
    loadMyLikeRecruitment();
    loadMyLikePlaceList();
    loadMyReveiwList();
  }, []);

  return (
    <>
      <Box sx={{ paddingX: '4vh', paddingY: '2vh', paddingBottom: '50px' }}>
        <h1 style={{ fontSize: '1.7rem', marginBottom: '2rem' }}>마이페이지</h1>
        <Divider sx={{ marginBottom: '7px' }} />
        <br />
        <Accordion expanded={isOpened}>
          <AccordionSummary onClick={openClose} sx={{ fontSize: '1.2rem' }}>
            내가 지원한 모집 공고
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" spacing={1}>
              {myAppliedRecruitment.map((recruitment) => {
                return (
                  <Box key={recruitment?.uid}>
                    <Box
                      sx={{
                        borderRadius: '50px',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        background: '#FFFFFF',
                      }}
                    >
                      <MyMainRecruitment recruitment={recruitment} />
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
        <br />

        <Accordion>
          <AccordionSummary sx={{ fontSize: '1.2rem' }}>
            내가 관심있는 글
          </AccordionSummary>
          <AccordionDetails sx={{ borderTop: 'none', m: 0, p: 0 }}>
            <TabContext value={tabNum}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  marginX: '16px',
                }}
              >
                <TabList onChange={handleChangeTab} sx={{ paddingTop: '10px' }}>
                  <Tab
                    label="게스트하우스"
                    value="0"
                    sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                  />
                  <Tab
                    label="관광지"
                    value="1"
                    sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                  />
                </TabList>
              </Box>
              <TabPanel value="0">
                <Stack direction="column" spacing={1}>
                  {myInterestGuestHouses.map((guestHouse) => {
                    return (
                      <Box
                        key={guestHouse.uid}
                        onClick={() =>
                          navigate(`/guesthouse/detail/${guestHouse.uid}`)
                        }
                        sx={{ cursor: 'pointer' }}
                      >
                        <Box
                          sx={{
                            borderRadius: '50px',
                            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                            background: '#FFFFFF',
                          }}
                        >
                          <MyInterestGuestHouse guestHouse={guestHouse} />
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value="1">
                <Stack direction="column" spacing={1}>
                  {myLikePlaceList.map((post) => {
                    return (
                      <Box
                        key={post.uid}
                        onClick={() =>
                          navigate(`/staffpicklist/detail/${post?.uid}`)
                        }
                        sx={{ cursor: 'pointer' }}
                      >
                        <Box
                          sx={{
                            borderRadius: '50px',
                            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                            background: '#FFFFFF',
                          }}
                        >
                          <MyMainArticle post={post} />
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              </TabPanel>
            </TabContext>
          </AccordionDetails>
        </Accordion>
        <br />

        <Accordion>
          <AccordionSummary sx={{ fontSize: '1.2rem' }}>
            내가 작성한 글
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" spacing={1} sx={{ marginTop: '10px' }}>
              {myPosts.map((post) => {
                return (
                  <Box
                    key={post.reviewUid}
                    onClick={() =>
                      navigate(`/staffpicklist/detail/${post.uid}`)
                    }
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box
                      sx={{
                        borderRadius: '50px',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        background: '#FFFFFF',
                      }}
                    >
                      <MyMainArticle post={post} />
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
