import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { images } from '../../assets/images';

export default function StaffPickCreateNewSpotFinish() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontSize: '40px',
          fontFamily: 'GmarketSansBold',
          // color: 'primary.main',
          // marginTop: '2rem',
          marginBottom: '0.5rem',
        }}
      >
        새로운 명소 등록에 성공하셨습니다!
      </Typography>
      <Typography
        sx={{
          fontSize: '20px',
        }}
      >
        다음 스탭으로 넘어가 등록한 명소에 대한 리뷰를 작성해주세요!
      </Typography>
      <img src={images.typing} alt="img" style={{ height: '350px' }} />
    </Box>
  );
}
