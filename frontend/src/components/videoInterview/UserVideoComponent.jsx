import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import OvVideo from './OvVideo';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';

export default function UserVideoComponent({
  streamManager,
  main,
  num,
  speaking,
  videoOfff,
  audioOff,
}) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const getNicknameTag = () => {
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  const calculateWidth = () => {
    if (num === 1) return 1050;
    else if (num === 2) return 948;
    else if (num === 3) return 632;
    else if (num <= 6) return 530;
    else if (num <= 8) return 470;
  };

  useEffect(() => {
    setHeight((width / 4) * 3);
  }, [width]);

  useEffect(() => {
    const newWidth = calculateWidth();
    setWidth(newWidth);
  });

  return (
    <div style={{ margin: '2px', height }}>
      {streamManager !== undefined ? (
        <>
          <OvVideo streamManager={streamManager} main={main} width={width} />
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              bottom: 34,
              backgroundColor: 'black',
              width: 'fit-content',
              height: 'fit-content',
              opacity: '0.8',
              paddingX: '5px',
              borderBottomLeftRadius: '8px',
            }}
          >
            {speaking ? (
              <SettingsVoiceIcon sx={{ color: 'green', marginY: 'auto' }} />
            ) : null}
            {videoOfff ? (
              <VideocamOffIcon sx={{ color: 'red', marginY: 'auto' }} />
            ) : null}
            {audioOff ? (
              <MicOffIcon sx={{ color: 'red', marginY: 'auto' }} />
            ) : null}
            <Typography fontSize={20} color="white">
              {getNicknameTag()}
            </Typography>
          </Box>
        </>
      ) : null}
    </div>
  );
}
