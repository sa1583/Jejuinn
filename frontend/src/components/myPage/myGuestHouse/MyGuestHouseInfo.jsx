import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../store/user';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography, Popover, Switch } from '@mui/material';
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
    console.log('my-staffs:', data.data);
    setMyStaffs(data.data);
  }

  const [myJobOffers, setMyJobOffers] = useState([]);
  async function getMyJobOffer() {
    const data = await myJobOfferList(guestHouseUid);
    console.log('my-job-offers:', data.data);
    setMyJobOffers(data.data);
  }

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
              <WhiteBox key={uuidv4()} cpn={<MyStaff myStaff={myStaff} />} />
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
          <Typography style={{ fontSize: '1.3rem' }}>진행중인 직무</Typography>
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
