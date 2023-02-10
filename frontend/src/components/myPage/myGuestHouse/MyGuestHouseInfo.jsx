import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../store/user';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography, Popover, Switch } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { myStaffList, myJobOfferList } from '../../../api/guestHouse';
import WhiteBox from '../../whiteBox/WhiteBox';
import MyStaff from './MyStaff';
import MyJobOffer from './MyJobOffer';

export default function MyGuestHouseInfo({ guestHouseUid }) {
  const access_token = useSelector(selectAccessToken);

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [myStaffs, setMyStaffs] = useState([]);
  async function getMyStaff() {
    const data = await myStaffList(access_token, guestHouseUid);
    console.log(data);
    setMyStaffs(data);
  }

  // const myStaffs = [
  //   {
  //     uid: '1',
  //     guestHouseUid: '5',
  //     userUid: '5',
  //     name: '장정민',
  //     startDate: '2023-01-20',
  //     endDate: '2023-03-20',
  //     workName: '리셉션',
  //   },
  //   {
  //     uid: '2',
  //     guestHouseUid: '5',
  //     userUid: '6',
  //     name: '최다은',
  //     startDate: '2023-01-20',
  //     endDate: '2023-04-20',
  //     workName: '스탭',
  //   },
  // ];

  const [myJobOffers, setMyJobOffers] = useState([]);
  async function getMyJobOffer() {
    const data = await myJobOfferList(access_token, guestHouseUid);
    console.log(data.data);
    setMyJobOffers(data.data);
  }

  // const myJobOffers = [
  //   {
  //     guestHouseUid: '1',
  //     c: '제주게토 게스트하우스 청소 및 스텝 모집',
  //     content: '여기 좋아요',
  //     welfare: '복지로 아침도 드려요',
  //     work: [
  //       {
  //         workName: '스탭',
  //         personnel: '3',
  //         workType: '2일 근무, 2일 휴무',
  //         minimumWorkPeriod: '1달 이상',
  //         workTime: '근무 시 09시 ~ 16시',
  //         workDescriptoin: '투숙객 안내 및 파티 주도',
  //       },
  //       {
  //         workName: '청소',
  //         personnel: '1',
  //         workType: '2일 근무, 2일 휴무',
  //         minimumWorkPeriod: '1달 이상',
  //         workTime: '근무 날짜에 11시 ~ 15시',
  //         workDescriptoin: '방 청소 및 게스트하우수 마당 청소',
  //       },
  //     ],
  //     pictures: ['abasdaf1.jpg', 'abasda2f.jpg', 'abasdaf3.jpg'],
  //   },
  // ];

  useEffect(() => {
    getMyStaff();
    getMyJobOffer();
  }, []);

  return (
    <div>
      <h3>나는 게하 uid: {guestHouseUid}</h3>
      {/* 스탭 정보 */}
      <Box>
        <Typography style={{ fontSize: '1.3rem' }}>스탭 정보</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginY: '15px',
          }}
        >
          {myStaffs.map((myStaff) => {
            return (
              <WhiteBox key={myStaff.uid} cpn={<MyStaff myStaff={myStaff} />} />
            );
          })}
        </Box>
      </Box>
      <br />
      <hr />

      {/* 진행중인 공고 */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginY: '15px',
          }}
        >
          <Typography style={{ fontSize: '1.3rem' }}>진행중인 공고</Typography>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {myJobOffers.map((myJobOffer) => {
            return (
              <WhiteBox
                key={uuidv4()}
                cpn={<MyJobOffer myJobOffer={myJobOffer} checked={checked} />}
              />
            );
          })}
        </Box>
      </Box>
    </div>
  );
}
