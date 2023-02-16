import { Box, Typography } from '@mui/material';
import WhiteBox from '../whiteBox/WhiteBox';

export default function WorkHistory({
  history: { endDate, guestHouseName, startDate, workName },
}) {
  return (
    <Box width="200px">
      <WhiteBox
        cpn={
          <Box padding="15px" minHeight="100px">
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'primary.main',
              }}
            >
              {guestHouseName}
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{workName}</Typography>
            <Typography>
              {startDate} ~ {endDate}
            </Typography>
          </Box>
        }
      />
    </Box>
  );
}
