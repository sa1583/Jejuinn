import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import MyGuestHouseCom from './MyGuestHouseCom';
import MyStaff from './MyStaff';
import NowRecruiting from './NowRecruiting';
import WhiteBox from '../whiteBox/WhiteBox';
import Switch from '@mui/material/Switch';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function MyGuestHouse() {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const myGuestHouses = [
    {
      uid: '5',
      gusetHouseName: '제주 게토',
    },
    {
      uid: '6',
      gusetHouseName: '제주 간장남',
    },
  ];
  const myStaffs = [
    {
      uid: '1',
      guestHouseUid: '5',
      userUid: '5',
      name: '장정민',
      startDate: '2023-01-20',
      endDate: '2023-03-20',
      workName: '리셉션',
    },
    {
      uid: '2',
      guestHouseUid: '5',
      userUid: '6',
      name: '최다은',
      startDate: '2023-01-20',
      endDate: '2023-04-20',
      workName: '스탭',
    },
  ];
  const nowRecruitings = [
    {
      guestHouseUid: '1',
      c: '제주게토 게스트하우스 청소 및 스텝 모집',
      content: '여기 좋아요',
      welfare: '복지로 아침도 드려요',
      work: [
        {
          workName: '스탭',
          personnel: '3',
          workType: '2일 근무, 2일 휴무',
          minimumWorkPeriod: '1달 이상',
          workTime: '근무 시 09시 ~ 16시',
          workDescriptoin: '투숙객 안내 및 파티 주도',
        },
        {
          workName: '청소',
          personnel: '1',
          workType: '2일 근무, 2일 휴무',
          minimumWorkPeriod: '1달 이상',
          workTime: '근무 날짜에 11시 ~ 15시',
          workDescriptoin: '방 청소 및 게스트하우수 마당 청소',
        },
      ],
      pictures: ['abasdaf1.jpg', 'abasda2f.jpg', 'abasdaf3.jpg'],
    },
  ];

  return (
    <>
      <Box sx={{ paddingX: '4vh', paddingY: '2vh', paddingBottom: '50px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1>게스트하우스 관리</h1>
          <Box sx={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <SettingsIcon color="warning" />
              <p style={{ paddingLeft: '5px' }}>설정</p>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: '1.3rem' }}>내 게스트하우스</p>
            <Link
              to="/guesthouse/create"
              style={{ textDecoration: 'none', color: '#FF7600' }}
            >
              + 새로운 게스트하우스
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
            {myGuestHouses.map((myGuestHouse) => {
              return (
                <WhiteBox
                  key={myGuestHouse.uid}
                  cpn={<MyGuestHouseCom myGuestHouse={myGuestHouse} />}
                />
              );
            })}
          </Box>
        </Box>
        <br />
        <hr />

        <Box>
          <p style={{ fontSize: '1.3rem' }}>스탭 정보</p>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {myStaffs.map((myStaff) => {
              return (
                <WhiteBox
                  key={myStaff.uid}
                  cpn={<MyStaff myStaff={myStaff} />}
                />
              );
            })}
          </Box>
        </Box>
        <br />
        <hr />

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: '1.3rem' }}>진행중인 공고</p>
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <div>
                <Typography
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <HelpOutlineIcon color="warning" />
                </Typography>
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
                  <Typography sx={{ p: 1 }}>
                    자동으로 해당 공고에 맞는 지원자들을 추천해드립니다
                  </Typography>
                </Popover>
              </div>
              <p style={{ paddingLeft: '5px' }}>자동추천</p>
              <Switch
                color="warning"
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {nowRecruitings.map((nowRecruiting) => {
              return (
                <WhiteBox
                  key={uuidv4()}
                  cpn={
                    <NowRecruiting
                      nowRecruiting={nowRecruiting}
                      checked={checked}
                    />
                  }
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}
