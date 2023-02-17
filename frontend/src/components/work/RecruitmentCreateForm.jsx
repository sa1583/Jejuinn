import { recruitmentDetail } from '../../api/work';
import { Grid, Box, styled, TextField, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { FilterStyle } from './Filters';

const CustomTextField = styled(TextField)({
  '& label': {
    color: '#000000',
    marginTop: '2px',
  },
  '& label.Mui-focused': {
    color: '#FF7600',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d1d1d1',
      opacity: '83%',
      height: '100%',
      borderRadius: '62px',
      margin: 'auto',
    },
    '&:hover fieldset': {
      borderColor: '#FF7600',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF7600',
    },
  },
});

export default function RecruitmentCreateForm({ handleInput }) {
  const [isCreate, setIsCreate] = useState();
  const [postUid, setPostUid] = useState();

  const [title, setTitle] = useState('');
  const [welfare, setWelfare] = useState('');
  const [wanted, setWanted] = useState([]);
  const [addInfo, setAddInfo] = useState('');

  const [selectedValues, setSelectedValues] = useState([]);

  const selectedPersontypes = [
    '스탭 경험자',
    '활발한 성격',
    '책임감',
    '꼼꼼',
    '의사소통 기술',
    '친절함',
    '아침형 인간',
    '저녁형 인간',
    '빠른 습득',
    '열정',
    '대처능력',
    '빠른 일처리 ',
  ];

  const handleSetInput = () => {
    handleInput(title, welfare, wanted, addInfo);
  };
  useEffect(() => {
    handleSetInput();
  }, [title, welfare, wanted, addInfo]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split('/')[2] === 'create') {
      setIsCreate(true);
    } else {
      setIsCreate(false);
      setPostUid(location.pathname.split('/')[3]);
    }
  }, []);

  function onWanted(input) {
    setWanted([...input]);
  }

  useEffect(() => {
    setWanted(selectedValues);
  }, [selectedValues]);
  // create가 아닐 때 이전 공고 id받아서 정보 세팅하기
  const getRecruitmentInfo = async () => {
    const { data } = await recruitmentDetail(postUid);
    setTitle(data.recruitment.title);
    setWelfare(data.recruitment.welfare);
    setWanted(data.recruitment.wanted);
    setAddInfo(data.recruitment.addInfo);
  };
  useEffect(() => {
    if (postUid) {
      getRecruitmentInfo();
    }
  }, [postUid]);

  return (
    <Box sx={{ paddingTop: '2rem', height: '100%' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <CustomTextField
              label="공고명"
              placeholder="공고명을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                width: '100%',
              }}
            />
          </Grid>

          <Grid item md={6}>
            <CustomTextField
              label="복지"
              placeholder="복지를 입력하세요"
              title={welfare}
              onChange={(e) => setWelfare(e.target.value)}
              sx={{
                width: '100%',
              }}
            />
          </Grid>

          <Grid item md={6}>
            <FilterStyle value={wanted} setValue={setWanted} />
          </Grid>

          <Grid item md={12}>
            <CustomTextField
              label="상세설명"
              multiline
              title={addInfo}
              rows={7}
              onChange={(e) => setAddInfo(e.target.value)}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '20vh',
                  '& fieldset': {
                    borderRadius: '30px',
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
