import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import OvVideo from './OvVideo';

export default function UserVideoComponent({
  streamManager,
  main,
  num,
  volumn,
}) {
  const [width, setWidth] = useState(0);
  const [borderWidth, setBorderWidth] = useState('0px');

  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  const calculateWidth = () => {
    if (num === 2) {
      return 1900 / num;
    } else if (num === Math.sqrt(num) * Math.sqrt(num)) {
      return 1000 / Math.sqrt(num);
    } else {
      return 1000 / (Math.sqrt(num) + 1);
    }
  };

  // useEffect(() => {
  //   console.log('volumn', volumn);
  //   console.log(Math.max(volumn + 100, 0) / 20);
  //   setBorderWidth(`${Math.max(volumn + 100, 0) / 20}px`);
  // }, [volumn]);

  useEffect(() => {
    const newWidth = calculateWidth();
    setWidth(newWidth);
    // setHeight((newWidth / 16) * 9);
  });

  return (
    <div>
      {streamManager !== undefined ? (
        <>
          <OvVideo streamManager={streamManager} main={main} width={width} />
          <Box
            sx={{
              position: 'relative',
              bottom: 32,
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
