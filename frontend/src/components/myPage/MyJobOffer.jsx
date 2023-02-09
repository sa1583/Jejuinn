import { Box, Fade } from '@mui/material';
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

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingX: '2vh',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ paddingX: '2vh' }}>
        <h3 style={{ marginBottom: '2px' }}>{myJobOffer.title}</h3>
        <p style={{ marginTop: '0', marginRight: '10px' }}>
          게시일: {myJobOffer.dateCreated} | 지원인원: 13명
        </p>
      </Box>
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
