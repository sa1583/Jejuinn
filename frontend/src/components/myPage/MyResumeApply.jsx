import {
  FormControlLabel,
  Button,
  Switch,
  Popover,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import React from 'react';
import WorkHistory from './WorkHistory';

// resume.autoApply

export default function MyResumeApply({ resume, changeApplyComp }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [historyList, setHistoryList] = useState([
    {
      uid: 1,
      guestHouseName: '가토 게스트하우스',
      startDate: '22-01-22',
      endDate: '23-4-14',
    },
    {
      uid: 15,
      guestHouseName: '정민 게스트하우스',
      startDate: '22-01-22',
      endDate: '23-4-14',
    },
  ]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Stack p="3%" spacing={3}>
      <Stack direction="row" alignItems="center">
        <HelpOutlineOutlinedIcon
          color="primary"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          justifyItems="flex-end"
          alignItems="flex-end"
        />
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1, width: '300px' }}>
            지원서에 작성한 내용을 바탕으로
            <br /> 적합한 게스트하우스에 자동으로 지원됩니다.
          </Typography>
        </Popover>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" defaultChecked />}
          label="자동추천"
          labelPlacement="start"
        />
        <Button onClick={changeApplyComp}>수정</Button>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">선호 스타일</Typography>
        <Typography>{resume.tag}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">선호 지역</Typography>
        <Typography>{resume.interestAreas}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">입도 가능일</Typography>
        <Typography>{resume.possibleStartDate}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">자기소개</Typography>
        <Typography>{resume.content}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography minWidth="100px">근무이력</Typography>
        <Stack direction="row" spacing={2}>
          {historyList.map((history) => {
            return <WorkHistory key={history.uid} history={history} />;
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
