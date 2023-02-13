import { Box, Chip, Fade, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function MyJobOffer({ myJobOffer, checked }) {
  const navigate = useNavigate();
  const goApplicantList = (workUid) => {
    navigate(`applicantlist/${workUid}`);
  };
  const goRecoommendList = (workUid) => {
    navigate(`recommendlist/${workUid}`);
  };

  const getGenderInfo = `${myJobOffer.gender}: ${myJobOffer.intake}`;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingX: '2vh',
        justifyContent: 'space-between',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{ paddingX: '2vh', py: '10px' }}
      >
        <Typography minWidth="100px">{myJobOffer.workName}</Typography>
        <Chip label={getGenderInfo} color="primary" />
        <Typography ml="10px">
          {myJobOffer.workDays}일 근무 {myJobOffer.daysOff}일 휴식
        </Typography>
      </Stack>
      <Box>
        <Fade in={checked}>
          <Button
            onClick={() => goRecoommendList(myJobOffer.uid)}
            sx={{
              background: '#FF7600',
              borderRadius: '150px',
              color: 'white',
              border: 'none',
              paddingX: '15px',
              marginRight: '5px',
              '&:hover': {
                color: 'white',
                background: '#FF7600',
              },
            }}
          >
            추천스탭 보기
          </Button>
        </Fade>
        <Button
          onClick={() => goApplicantList(myJobOffer.uid)}
          sx={{
            background: '#FF7600',
            borderRadius: '100px',
            color: 'white',
            border: 'none',
            paddingX: '15px',
            '&:hover': {
              color: 'white',
              background: '#FF7600',
            },
          }}
        >
          지원자 보기
        </Button>
      </Box>
    </Box>
  );
}
