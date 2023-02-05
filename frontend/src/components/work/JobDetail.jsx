import { Box, styled, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)({
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FF7600',
  },
});

export default function JobDetail({ work }) {
  const navigate = useNavigate();

  const onJobDetail = () => {
    // API 완성되면 recruitmentId 경로에 추가
    // navigate(`/worklist/detail/${work.uid}`);
    navigate(`/worklist/detail`);
  };
  const onApply = () => {
    navigate('/지원서 제출 api로 연결~');
  };

  return (
    <>
      <Box sx={{ padding: '3vh', height: '100%' }}>
        <h2 onClick={onJobDetail} style={{ color: '#FF7600' }}>
          API 나오면 {work}.title 받아서 제목 보여줄거임~
        </h2>
        <div>
          API 나오면 work.detail 받아서 내용 나오는거 보고 구성하면 됨~~
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomButton
            variant="contained"
            sx={{
              alignItems: 'center',
              borderRadius: '62px',
              backgroundColor: '#FF7600',
              fontFamily: 'border',
            }}
            size="large"
            onClick={onApply}
          >
            지원하기
          </CustomButton>
        </Box>
      </Box>
    </>
  );
}
