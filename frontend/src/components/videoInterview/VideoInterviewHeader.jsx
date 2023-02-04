import { Box, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from 'react';

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

export default function VideoInterviewHeader({ handleVideo, handleAudio }) {
  const [mute, setMute] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  return (
    <Box
      width="100%"
      height="70px"
      sx={{
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box width="80%" display="flex" sx={{ justifyContent: 'center' }}>
        <Button sx={buttonOption} onClick={handleVideo}>
          <VideocamIcon />
        </Button>
        <Button sx={buttonOption} onClick={handleAudio}>
          <MicIcon />
        </Button>
      </Box>
    </Box>
  );
}
