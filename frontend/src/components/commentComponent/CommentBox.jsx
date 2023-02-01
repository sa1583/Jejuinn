import { Box } from '@mui/system';

export default function CommentBox({ cpn }) {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '23px',
        boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.75)',
      }}
    >
      {cpn}
    </Box>
  );
}
