import { useState, useEffect } from 'react';
import { recruitmentDetail } from '../../api/work';
import { Box, Button, Grid } from '@mui/material';
import {
  GetRecruitmentTitle,
  GetRecruitmentInfo,
  GetRecruitmentWelfare,
  GetRecruitmentPersontype,
} from './WorkWriteForms';
import { postRecruitment } from '../../api/work';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/user';

export default function RecruitmentWrite({ onClick }) {
  const token = useSelector(selectAccessToken);
  const [persontype, setPersontype] = useState([]);
  function onPersontype(input) {
    setPersontype([...input]);
  }
  const [recruimentInfo, setRecruimentInfo] = useState({
    title: '',
    welfare: '',
    persontype: [],
    addInfo: '',
  });

  const handleRecruimentInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRecruimentInfo({ ...recruimentInfo, [name]: value });
  };

  useEffect(() => {
    setRecruimentInfo({ ...recruimentInfo, persontype: persontype });
  }, [persontype]);

  const twoCalls = () => {
    onClick();
    postRecruitment(token, recruimentInfo);
  };

  return (
    <Box sx={{ paddingY: '3vh', height: '100%' }}>
      <Grid container>
        <Grid item md={10}>
          <GetRecruitmentTitle handleRecruimentInfo={handleRecruimentInfo} />
        </Grid>
        <Grid item md={2}>
          <Button onClick={twoCalls}>저장</Button>
        </Grid>
      </Grid>

      <Box sx={{ paddingX: '2vh', height: '100%' }}>
        <Grid container>
          <Grid item md={3}>
            복지
          </Grid>
          <Grid item md={9}>
            <GetRecruitmentWelfare
              handleRecruimentInfo={handleRecruimentInfo}
            />
          </Grid>

          <Grid item md={3}>
            인재상
          </Grid>
          <Grid item md={9}>
            <GetRecruitmentPersontype onPersontype={onPersontype} />
          </Grid>

          <Grid item md={3}>
            추가 정보
          </Grid>
          <Grid item md={9}>
            <GetRecruitmentInfo handleRecruimentInfo={handleRecruimentInfo} />
          </Grid>
        </Grid>
        <div>
          워크 아이디 부여되면 해당 워크 관련 정보 보여주고 아래 진행중인 채용
          목록에서는 제외 /// 이미지 입력: 위에 게하정보 보여주는 데서 할거임!
        </div>
      </Box>
    </Box>
  );
}
