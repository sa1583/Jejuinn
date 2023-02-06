import { Box, styled, Button } from '@mui/material';
import { workDetail } from '../../api/work';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const CustomButton = styled(Button)({
  height: '5vh',
  '&:hover': {
    backgroundColor: '#FF7600',
  },
});

export default function JobDetail({ workid }) {
  const navigate = useNavigate();
  const [work, setWork] = useState({});

  async function getWork() {
    const work = await workDetail(workid);
    console.log(work.data);
    setWork(work.data.recruitment);
  }

  useEffect(() => {
    getWork();
  }, []);

  const onJobDetail = () => {
    navigate(`/worklist/detail/${workid}`);
  };
  const onApply = () => {
    navigate('/지원서 제출 api로 연결~');
  };
  return (
    <>
      <Box sx={{ padding: '3vh', height: '100%' }}>
        <h2 onClick={onJobDetail} style={{ color: '#FF7600' }}>
          {work.title}
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
