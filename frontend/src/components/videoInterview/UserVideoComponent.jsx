import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import OvVideo from './OvVideo';

export default function UserVideoComponent({ streamManager, main, num }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  const calculateWidth = () => {
    if (num === 1) {
      return 1000;
    } else if (num === Math.sqrt(num) * Math.sqrt(num)) {
      return 1536 / Math.sqrt(num);
    } else {
      return 1536 / (Math.sqrt(num) + 1);
    }
  };

  useEffect(() => {
    const newWidth = calculateWidth();
    console.log('width: ', newWidth);
    setWidth(newWidth);
    setHeight((newWidth / 4) * 3);
  });

  useEffect(() => {
    console.log('height', height);
  }, [height]);

  return (
    <div>
      {streamManager !== undefined ? (
        <>
          <OvVideo streamManager={streamManager} main={main} width={width} />
          <Box
            sx={{
              position: 'relative',
              bottom: 32,
              // right: width,
              backgroundColor: 'white',
              width: 'fit-content',
              height: 'fit-content',
              opacity: '0.7',
            }}
          >
            <Typography fontSize={20}>{getNicknameTag()}</Typography>
          </Box>
        </>
      ) : null}
    </div>
  );
}
