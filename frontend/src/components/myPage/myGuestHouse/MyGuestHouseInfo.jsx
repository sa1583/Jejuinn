import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../store/user';
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography } from '@mui/material';
import { myActiveStaffList, myJobOfferList } from '../../../api/guestHouse';
import { guestHouseDetail } from '../../../api/guestHouse';
import MyStaff from './MyStaff';
import MyJobOffer from './MyJobOffer';

export default function MyGuestHouseInfo({ guestHouseUid }) {
  const access_token = useSelector(selectAccessToken);

  const [checked, setChecked] = useState(true);
  const [guestHouse, setGuestHouse] = useState();
  const [myStaffs, setMyStaffs] = useState([]);

  async function getMyStaff() {
    const { data } = await myActiveStaffList(access_token, guestHouseUid);
    setMyStaffs(data);
  }

  const getGuestHouseInfo = async () => {
    const { data } = await guestHouseDetail(guestHouseUid);
    setGuestHouse(data);
  };

  const [myJobOffers, setMyJobOffers] = useState([]);

  async function getMyJobOffer() {
    const { data } = await myJobOfferList(guestHouseUid);
    setMyJobOffers(data);
  }

  useEffect(() => {
    getMyStaff();
    getMyJobOffer();
    getGuestHouseInfo();
  }, []);

  return (
    <div>
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
              <Box
                key={uuidv4()}
                sx={{
                  borderRadius: '50px',
                  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                  background: '#FFFFFF',
                }}
              >
                <MyStaff
                  myStaff={myStaff}
                  guestHouseUid={guestHouse?.guestHouse?.uid}
                  loadMyStaff={getMyStaff}
                />
              </Box>
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
              <Box
                key={uuidv4()}
                sx={{
                  borderRadius: '50px',
                  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                  background: '#FFFFFF',
                }}
              >
                <MyJobOffer myJobOffer={myJobOffer} checked={checked} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
}
