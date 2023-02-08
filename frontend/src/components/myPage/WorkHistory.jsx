import { Box, Typography } from '@mui/material';
import WhiteBox from '../whiteBox/WhiteBox';

export default function WorkHistory(props) {
  return (
    <Box width="150px">
      <WhiteBox
        cpn={
          <Box padding="15px">
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '20px',
                lineHeight: '24px',
                color: 'primary.main',
              }}
            >
              {props.guestHouseName}
            </Typography>
            <Typography>
              {props.startDate} ~ {props.endDate}
            </Typography>
          </Box>
        }
      />
    </Box>
  );
}
