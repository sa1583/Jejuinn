import {
  Box,
  styled,
  Button,
  TextField,
  Stack,
  Typography,
  InputAdornment,
} from '@mui/material';
import {
  FilterDate,
  FilterArea,
  FilterStyle,
  FilterGuestHouseStyle,
} from '../../work/Filters';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  changeAutoApply,
  modifyMyResume,
  registMyResume,
} from '../../../api/resume';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../../store/user';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)({
  marginTop: '3rem',
  height: '3.5rem',
  width: '40%',
  fontSize: '1.8vh',
  fontColor: 'white',
  borderRadius: '50px',
  '&:hover': {
    background: '#FF7600',
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
      borderRadius: '20px',
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
  const [area, setArea] = useState('전체');
  const [startDate, setStartDate] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [myStyleTag, setMyStyleTags] = useState([]);
  const [guestHouseStyleTag, setGuestHouseStyleTags] = useState([]);
  const [minWorkPeriod, setMinWorkPeriod] = useState(1);
  const [intro, setIntro] = useState('');

  const userInfo = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);

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
    const body = {
      autoApply: resume?.autoApply ? resume.autoApply : false,
      content: intro,
      instagramLink: instagramUrl,
      guestHouseTypes: guestHouseStyleTag,
      interestArea: area,
      minWorkPeriod,
      personTypes: myStyleTag,
      possibleStartDate: startDate,
      userUid: userInfo.uid,
    };

    if (resume) {
      body.uid = resume.uid;
      await modifyMyResume(accessToken, body);
    } else {
      await registMyResume(accessToken, body);
    }
    changeApplyComp();
  };

  useEffect(() => {
    if (resume) {
      const newMyStyleTags = [];
      resume.personTypes.map(({ type }) => {
        newMyStyleTags.push(type);
      });

      const newGuestHouseType = [];
      resume.guestHouseTypes?.map((type) => {
        newGuestHouseType.push(type);
      });

      setMyStyleTags(newMyStyleTags);
      setInstagramUrl(resume.instagramLink ? resume.instagramLink : '');
      setGuestHouseStyleTags(newGuestHouseType);
      setArea(resume.interestArea);
      setStartDate(resume.possibleStartDate);
      setMinWorkPeriod(resume.minWorkPeriod);
      setIntro(resume.content);
    }
  }, []);

  return (
    <Box sx={{ padding: '3%' }} spacing={4}>
      <Stack direction="column" spacing={2}>
        <Typography sx={{ fontSize: 23, fontWeight: 'bold' }}>
          지원서 작성
        </Typography>
        <br />
        <Stack direction="row" alignItems="center" spacing={8}>
          <Typography minWidth={minWidth} sx={{ fontSize: 20 }}>
            내 스타일
          </Typography>
          <FilterStyle value={myStyleTag} setValue={setMyStyleTags} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={8}>
          <Typography minWidth={minWidth} sx={{ fontSize: 20 }}>
            인스타그램 주소
          </Typography>
          <CustomTextField
            sx={{ width: '100%' }}
            value={instagramUrl}
            onChange={writeInstagramUrl}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={8}>
          <Typography minWidth={minWidth} sx={{ fontSize: 20 }}>
            선호하는 스타일
          </Typography>
          <FilterGuestHouseStyle
            value={guestHouseStyleTag}
            setValue={setGuestHouseStyleTags}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={8}>
          <Typography minWidth={minWidth} sx={{ fontSize: 20 }}>
            선호 지역
          </Typography>
          <FilterArea value={area} setValue={setArea} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={8}>
          <Typography minWidth={minWidth} sx={{ fontSize: 20 }}>
            입도 가능일
          </Typography>
          <FilterDate value={startDate} setValue={setStartDate} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={8}>
          <Typography minWidth={minWidth} sx={{ fontSize: 20 }}>
            최소 근무 기간
          </Typography>
          <CustomTextField
            value={minWorkPeriod}
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
        <br />
        <Stack direction="row" spacing={8}>
          <Typography minWidth={minWidth} sx={{ fontSize: 20 }}>
            자기소개
          </Typography>
          <CustomTextField
            value={intro}
            placeholder="자기소개 내용을 입력해주세요"
            onChange={writeIntro}
            variant="standard"
            sx={{ width: '100%' }}
            multiline
            rows={3}
          />
        </Stack>
        <br />
        <Box display="flex" justifyContent="center">
          <CustomButton
            onClick={submitResume}
            variant="contained"
            disabled={
              !area ||
              !startDate ||
              !minWorkPeriod ||
              !intro ||
              myStyleTag.length === 0 ||
              guestHouseStyleTag.length === 0
            }
          >
            지원서 저장
          </CustomButton>
        </Box>
      </Stack>
    </Box>
  );
}
