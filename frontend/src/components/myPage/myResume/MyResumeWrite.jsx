import {
  Box,
  styled,
  Button,
  TextField,
  Stack,
  Typography,
  InputAdornment,
} from '@mui/material';
import { FilterDate, FilterArea, FilterStyle } from '../../work/Filters';
import { useState } from 'react';
import { useEffect } from 'react';
import { registMyResume } from '../../../api/resume';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../../store/user';

const CustomButton = styled(Button)({
  border: '1px solid #FF7600',
  variant: 'outlined',
  color: '#FF7600',
  width: '70%',
  borderRadius: '62px',
  fontFamily: 'border',
  height: '5vh',
  '&:hover': {
    color: '#FFFFFF',
    border: '1px solid #FFFFFF',
    backgroundColor: '#FF7600',
  },
});

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

const minWidth = '150px';

export default function MyResumeWrite({ resume, changeApplyComp }) {
  const [area, setArea] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [myStyleTag, setMyStyleTags] = useState([]);
  const [guestHouseStyleTag, setGuestHouseStyleTags] = useState([]);
  const [minWorkPeriod, setMinWorkPeriod] = useState(0);
  const [intro, setIntro] = useState('');
  // twoCalls 사용해서

  const userInfo = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);

  const writeArea = (imp) => {
    setArea(imp);
  };
  const writeMyStyleTags = (imp) => {
    setMyStyleTags(imp);
  };
  const writeGuestHouseStyleTags = (imp) => {
    setGuestHouseStyleTags(imp);
  };
  const writeStartDate = (imp) => {
    setStartDate(imp.$d.toISOString().split('T')[0]);
  };
  const writeIntro = (imp) => {
    setIntro(imp.target.value);
  };
  const writeInstagramUrl = (event) => {
    setInstagramUrl(event.target.value);
  };
  const writeMinWorkPeriod = (event) => {
    setMinWorkPeriod(event.target.value);
  };

  const submitResume = async () => {
    if (resume) {
    } else {
      try {
        const body = {
          autoApply: false,
          content: intro,
          guestHouseType: guestHouseStyleTag,
          interestAreas: area,
          minWorkPeriod,
          personTypes: myStyleTag,
          possibleStartDate: startDate,
          userUid: userInfo.uid,
        };
        await registMyResume(accessToken, body);
        changeApplyComp();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (resume) {
      console.log(resume);
    }
  }, []);

  useEffect(() => {
    console.log(
      area,
      myStyleTag,
      instagramUrl,
      guestHouseStyleTag,
      startDate,
      intro,
    );
  }, [area, myStyleTag, instagramUrl, guestHouseStyleTag, startDate, intro]);
  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center">
          <Typography minWidth={minWidth}>내 스타일</Typography>
          <FilterStyle onStyleTags={writeMyStyleTags} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography minWidth={minWidth}>인스타그램 주소</Typography>
          <CustomTextField
            sx={{ width: '100%' }}
            onChange={writeInstagramUrl}
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography minWidth={minWidth}>선호하는 스타일</Typography>
          <FilterStyle onStyleTags={writeGuestHouseStyleTags} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography minWidth={minWidth}>선호 지역</Typography>
          <FilterArea onArea={writeArea} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography minWidth={minWidth}>입도 가능일</Typography>
          <FilterDate onStartDate={writeStartDate} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography minWidth={minWidth}>최소 근무 기간</Typography>
          <CustomTextField
            onChange={writeMinWorkPeriod}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">개월</InputAdornment>
              ),
            }}
            sx={{ width: '100%' }}
            type="number"
          />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography minWidth={minWidth}>자기소개</Typography>
          <CustomTextField
            onChange={writeIntro}
            variant="standard"
            sx={{ width: '100%' }}
            multiline
            rows={3}
          />
        </Stack>
        <Box display="flex" justifyContent="center">
          <CustomButton onClick={submitResume}>지원서 저장</CustomButton>
        </Box>
      </Stack>
    </Box>
  );
}
