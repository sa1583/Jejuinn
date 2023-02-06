import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NowRecruiting({ nowRecruiting, checked }) {
  const navigate = useNavigate();
  const goApplicantList = (id) => {
    navigate(`applicantlist/${id}`);
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
        <h3 style={{ marginBottom: '2px' }}>파티 게하 여성 1명 모집</h3>
        <p style={{ marginTop: '0', marginRight: '10px' }}>
          게시일: 2023-01-23 | 지원인원: 13명
        </p>
      </Box>
      <Box>
        {checked && (
          <Button
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
        )}
        <Button
          onClick={() => goApplicantList(nowRecruiting.guestHouseUid)}
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
