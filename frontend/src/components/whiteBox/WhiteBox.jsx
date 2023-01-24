import { Box } from '@mui/system';

export default function WhiteBox({ cpn }) {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '39px',
        boxShadow: '0px 2px 15px 0px rgba(0,0,0,0.75)',
      }}
    >
      {cpn}
    </Box>
  );
}
