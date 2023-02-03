import { Box, Typography } from '@mui/material';
import OvVideo from './OvVideo';

export default function UserVideoComponent(props) {
  const getNicknameTag = () => {
    console.log(props.streamManager);
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };
  return (
    <div>
      {props.streamManager !== undefined ? (
        <div>
          <OvVideo streamManager={props.streamManager} main={props.main} />
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
