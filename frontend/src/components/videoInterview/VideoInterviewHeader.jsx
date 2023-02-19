import { Box, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useEffect } from 'react';

const buttonOption = {
  borderRadius: '100px',
  background: 'white',
  minWidth: '50px',
  height: '50px',
  marginY: 'auto',
  marginX: '10px',
  color: 'green',
  ':hover': { background: 'grey' },
};

export default function VideoInterviewHeader({
  handleVideo,
  handleAudio,
  videoOff,
  audioOff,
  leaveSession,
}) {
  useEffect(() => {}, [videoOff, audioOff]);

  return (
    <Box
      width="100%"
      height="70px"
      sx={{
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box width="95%" display="flex" sx={{ justifyContent: 'center' }}>
        <Button sx={buttonOption} onClick={handleVideo}>
          {!videoOff ? (
            <VideocamIcon />
          ) : (
            <VideocamOffIcon sx={{ color: 'red' }} />
          )}
        </Button>
        <Button sx={buttonOption} onClick={handleAudio}>
          {!audioOff ? <MicIcon /> : <MicOffIcon sx={{ color: 'red' }} />}
        </Button>
      </Box>
      <Box>
        <Button
          sx={{
            fontSize: 18,
            backgroundColor: 'red',
            color: 'white',
          }}
          onClick={leaveSession}
        >
          나가기
        </Button>
      </Box>
    </Box>
  );
}
