import * as React from 'react';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import WhiteBox from '../whiteBox/WhiteBox';
import MyApplicantCom from './MyApplicantCom';

export default function MyApplicantList() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const myApplicants = [
    {
      uid: '1',
      userUid: '5',
      name: '장정민',
      age: '23',
      tags: '#활발 #유쾌',
      gender: '남자',
    },
    {
      uid: '2',
      userUid: '6',
      name: '최다은',
      age: '24',
      tags: '#꼼꼼 #성실',
      gender: '여자',
    },
  ];

  return (
    <div>
      <Box sx={{ paddingX: '4vh', paddingY: '2vh', paddingBottom: '50px' }}>
        <h1 style={{ fontSize: '1.8rem' }}>지원자 목록</h1>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="스탭" value="1" />
                <Tab label="리셉션" value="2" />
                <Tab label="주방" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {myApplicants.map((myApplicant) => {
                  return (
                    <WhiteBox
                      key={myApplicant.uid}
                      cpn={<MyApplicantCom myApplicant={myApplicant} />}
                    />
                  );
                })}
              </Box>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </Box>
    </div>
  );
}
