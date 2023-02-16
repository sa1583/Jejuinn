import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../../store/user';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { deepOrange, grey } from '@mui/material/colors';
import MyGuestHouseInfo from './MyGuestHouseInfo';
import { myGuestHouseList } from '../../../api/guestHouse';

const Tab = styled(TabUnstyled)`
  font-family: SUIT-Regular, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  background-color: transparent;
  padding: 18px;
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: inline-flex;
  justify-content: center;

  &:hover {
    background-color: ${deepOrange[300]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${deepOrange[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #fff;
    color: #ff7600;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => `
  font-family: SUIT-Regular, sans-serif;
  font-size: 1rem;
  padding: 25px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
`,
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  background-color: #FF7600 ;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  align-content: flex-start;
  box-shadow: 0px 4px 8px ${
    theme.palette.mode === 'dark' ? grey[900] : grey[200]
  };
  `,
);

export default function MyGuestHouse() {
  const access_token = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);
  const [myGuestHouses, setMyGuestHouses] = useState([]);

  async function getMyGuestHouse() {
    const data = await myGuestHouseList(access_token, userInfo.uid);
    setMyGuestHouses(data.data);
  }

  useEffect(() => {
    getMyGuestHouse();
  }, []);

  return (
    <>
      <Box sx={{ paddingX: '4vh', paddingY: '2vh', paddingBottom: '50px' }}>
        <h1 style={{ fontSize: '1.7rem', marginBottom: '2rem' }}>
          게스트하우스 관리
        </h1>
        <Divider sx={{ marginBottom: '7px' }} />
        <br />

        <Box sx={{ px: '3%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
              내 게스트하우스
            </p>
            <Link
              to="/guesthouse/create"
              style={{ textDecoration: 'none', color: '#FF7600' }}
            >
              + 새로운 게스트하우스
            </Link>
          </Box>
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              {myGuestHouses.map((myGuestHouse) => {
                return <Tab key={uuidv4()}>{myGuestHouse.guestHouseName}</Tab>;
              })}
            </TabsList>
            {myGuestHouses.map((myGuestHouse, index) => {
              return (
                <TabPanel key={uuidv4()} value={index}>
                  <MyGuestHouseInfo guestHouseUid={myGuestHouse.uid} />
                </TabPanel>
              );
            })}
          </TabsUnstyled>
        </Box>
        <br />
      </Box>
    </>
  );
}
