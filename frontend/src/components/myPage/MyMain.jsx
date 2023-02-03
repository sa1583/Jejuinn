import { Box, styled, Button, IconButton } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import WhiteBox from '../whiteBox/WhiteBox';
import MyMainApply from './MyMainApply';
import MyMainArticle from './MyMainArticle';
import MyMainLike from './MyMainLike';
import { useState } from 'react';

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
  const [isOpened, setIsOpened] = useState(true);
  const openClose = () => {
    const prev = isOpened;
    setIsOpened(!prev);
  };

  return (
    <>
      <Box sx={{ paddingY: '3%', paddingX: '3%' }}>
        <Accordion expanded={isOpened}>
          <AccordionSummary onClick={openClose}>
            내가 지원한 모집 공고
          </AccordionSummary>
          <AccordionDetails>
            <WhiteBox cpn={<MyMainApply />}></WhiteBox>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary>내가 관심있는 글</AccordionSummary>
          <AccordionDetails>
            <Box sx={{ paddingY: '1%' }}>
              <WhiteBox cpn={<MyMainLike />}></WhiteBox>
            </Box>
            <Box sx={{ paddingY: '1%' }}>
              <WhiteBox cpn={<MyMainLike />}></WhiteBox>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>내가 작성한 글</AccordionSummary>
          <AccordionDetails>
            <WhiteBox cpn={<MyMainArticle />}></WhiteBox>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
