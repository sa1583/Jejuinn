import { Box, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

export default function VideoInterviewHeader() {
  return (
    <Box
      width="100%"
      height="30px"
      sx={{ background: 'grey', display: 'flex', justifyContent: 'center' }}
    >
      <Box width="80%">
        <Button>
          <VideocamIcon />
        </Button>
      </Box>
    </Box>
  );
}
