import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import OvVideo from './OvVideo';

export default function UserVideoComponent({ streamManager, main }) {
  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  useEffect(() => {
    console.log('cur: ', streamManager);
  });
  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <OvVideo streamManager={streamManager} main={main} />
          <Box
            sx={{
              position: 'relative',
              bottom: '34px',
              backgroundColor: 'white',
              width: 'fit-content',
              opacity: '0.7',
            }}
          >
            <Typography fontSize={20}>{getNicknameTag()}</Typography>
          </Box>
        </div>
      ) : null}
    </div>
  );
}
