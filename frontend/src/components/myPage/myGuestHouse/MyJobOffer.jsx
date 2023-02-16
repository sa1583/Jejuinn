import { Box, Chip, Stack, Typography } from '@mui/material';
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

  const getGenderInfo = ` ${myJobOffer.gender} ${myJobOffer.intake}`;
  const getWorkName = () => {
    if (myJobOffer.workName.length > 7) {
      return myJobOffer.workName.substr(0, 7) + '...';
    } else {
      return myJobOffer.workName;
    }
  };

  return (
    <Box
      sx={{
        px: '3%',
        py: '2%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingX: '1vh', py: '10px' }}
      >
        <Typography
          minWidth="120px"
          maxWidth="120px"
          sx={{ fontSize: '18px', fontWeight: 'bold', color: '#FF7600' }}
        >
          {getWorkName()}
        </Typography>
        <Box>
          <Typography sx={{ fontSize: '17px' }}>
            성별&nbsp;&nbsp;&nbsp;{' '}
            <span style={{ fontWeight: 'bold' }}>{getGenderInfo}명</span>
          </Typography>
          <Typography sx={{ fontSize: '17px' }}>
            근무&nbsp;&nbsp;&nbsp;{' '}
            <span style={{ fontWeight: 'bold' }}>
              {myJobOffer.workDays}일 근무 | {myJobOffer.daysOff}일 휴식
            </span>
          </Typography>
        </Box>
      </Stack>
      <Box>
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
