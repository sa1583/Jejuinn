import { Box, styled, Button, IconButton, Stack } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import WhiteBox from '../../whiteBox/WhiteBox';
import MyMainArticle from './MyMainArticle';
import MyMainRecruitment from './MyMainRecruitment';
import { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { images } from '../../../assets/images';
import {
  getMyApplyList,
  getMyInterestGuestHouses,
  getMyInterestAttractions,
} from '../../../api/job';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../store/user';

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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
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

  const [isOpened, setIsOpened] = useState(true);
  const [tabNum, setTabNum] = useState('1');
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

  useEffect(() => {
    loadMyApplyList();
    loadMyLikeRecruitment();
    loadMyLikePlaceList();
    setMyPosts([
      {
        uid: 24,
        name: '엉또 폭포',
        imageUrl: images.sample_profile,
      },
      {
        uid: 83,
        name: '윾태 폭포',
        imageUrl: null,
      },
    ]);
  }, []);

  return (
    <>
      <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
        <Accordion expanded={isOpened}>
          <AccordionSummary onClick={openClose}>
            내가 지원한 모집 공고
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" spacing={1}>
              {myAppliedRecruitment.map((recruitment) => {
                return (
                  <WhiteBox
                    key={recruitment.uid}
                    cpn={<MyMainRecruitment recruitment={recruitment} />}
                  />
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>내가 관심있는 글</AccordionSummary>
          <AccordionDetails sx={{ borderTop: 'none', m: 0, p: 0 }}>
            <TabContext value={tabNum}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  marginX: '16px',
                }}
              >
                <TabList onChange={handleChangeTab}>
                  <Tab label="모집공고" value="1" />
                  <Tab label="관광지" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Stack direction="column" spacing={1}>
                  {myInterestGuestHouses.map((recruitment) => {
                    return (
                      <WhiteBox
                        key={recruitment.uid}
                        cpn={<MyMainRecruitment recruitment={recruitment} />}
                      />
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value="2">
                <Stack direction="column" spacing={1}>
                  {myLikePlaceList.map((post) => {
                    return (
                      <WhiteBox
                        key={post.uid}
                        cpn={<MyMainArticle post={post} />}
                      />
                    );
                  })}
                </Stack>
              </TabPanel>
            </TabContext>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>내가 작성한 글</AccordionSummary>
          <AccordionDetails>
            <Stack direction="column" spacing={1}>
              {myPosts.map((post) => {
                return (
                  <WhiteBox
                    key={post.uid}
                    cpn={<MyMainArticle post={post} />}
                  />
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}