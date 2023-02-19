import {
  FormControlLabel,
  Button,
  Switch,
  Popover,
  Typography,
  Stack,
  Chip,
  Box,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React from 'react';
import WorkHistory from '../WorkHistory';
import { changeAutoApply } from '../../../api/resume';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../../store/user';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

// resume.autoApply

export default function MyResumeApply({ resume, changeApplyComp }) {
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [apply, setApply] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  const handlePopoverOpen = (event) => {
    setOpen((prev) => !prev);
  };

  const handleChangeAutoApply = async () => {
    await changeAutoApply(accessToken, userInfo.uid);
    setApply((prev) => !prev);
  };

  useEffect(() => {
    setApply(resume.autoApply);
    setHistoryList(resume.staffRecordDetial);
  }, []);

  return (
    <Stack p="3%" spacing={4}>
      <Stack direction="row" alignItems="center" sx={{ marginLeft: 'auto' }}>
        <HelpOutlineOutlinedIcon
          ref={anchorRef}
          color="primary"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverOpen}
        />
        <Popover
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorRef.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1, width: '300px' }}>
            지원서에 작성한 내용을 바탕으로
            <br /> 적합한 게스트하우스에 자동으로 지원됩니다.
          </Typography>
        </Popover>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              onChange={handleChangeAutoApply}
              checked={apply}
            />
          }
          label="자동추천"
          labelPlacement="start"
        />
      </Stack>
      <Stack direction="column" spacing={3} sx={{ marginTop: 0 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ fontSize: 23, fontWeight: 'bold' }}>
            내 지원서
          </Typography>
          <Button
            variant="outlined"
            onClick={changeApplyComp}
            sx={{ marginLeft: '15px' }}
          >
            수정
          </Button>
        </Box>
        <br />
        <Stack direction="row" alignItems="center" spacing={15}>
          <Typography minWidth="100px" sx={{ fontSize: 20 }}>
            내 스타일
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {resume?.personTypes?.map(({ type }) => {
              return <Chip key={uuidv4()} label={'#' + type} color="primary" />;
            })}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={15}>
          <Typography minWidth="100px" sx={{ fontSize: 20 }}>
            인스타그램
          </Typography>
          <Typography sx={{ fontSize: 20, color: '#FF7600' }}>
            {resume.instagramLink}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={15}>
          <Typography minWidth="100px" sx={{ fontSize: 20 }}>
            선호 스타일
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {resume?.guestHouseTypes?.map((type) => {
              return <Chip key={uuidv4()} label={'#' + type} color="primary" />;
            })}
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={15}>
        <Typography minWidth="100px" sx={{ fontSize: 20 }}>
          선호 지역
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip label={'#' + resume.interestArea} color="primary" />
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={15}>
        <Typography minWidth="100px" sx={{ fontSize: 20 }}>
          입도 가능일
        </Typography>
        <Typography sx={{ fontSize: 20, color: '#FF7600' }}>
          {resume.possibleStartDate}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={15}>
        <Typography minWidth="100px" sx={{ fontSize: 20 }}>
          자기소개
        </Typography>
        <Typography sx={{ fontSize: 20, color: '#FF7600' }}>
          {resume.content}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={15}>
        <Typography minWidth="100px" sx={{ fontSize: 20 }}>
          근무이력
        </Typography>
        <Stack direction="row" spacing={2}>
          {historyList?.map((history) => {
            return (
              <Box
                key={uuidv4()}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate()}
              >
                <WorkHistory key={history.uid} history={history} />
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
