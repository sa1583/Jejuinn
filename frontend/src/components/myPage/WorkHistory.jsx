import { Box, Typography } from '@mui/material';
import WhiteBox from '../whiteBox/WhiteBox';

export default function WorkHistory({
  history: { endDate, guestHouseName, startDate, workName },
}) {
  return (
    <Box width="150px">
      <WhiteBox
        cpn={
          <Box padding="15px" minHeight="120px">
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
              {guestHouseName}
            </Typography>
            <Typography>{workName}</Typography>
            <Typography>
              {startDate} ~ {endDate}
            </Typography>
          </Box>
        }
      />
    </Box>
  );
}
