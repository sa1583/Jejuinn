import { Box } from '@mui/system';

export default function WhiteBox({ cpn }) {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '25px',
        boxShadow: '0px 2px 74px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      {cpn}
    </Box>
  );
}
