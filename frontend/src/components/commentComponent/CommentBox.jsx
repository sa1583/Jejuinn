import { Box } from '@mui/system';

export default function CommentBox({ cpn }) {
  return (
    <Box
      sx={
        {
          // width: '100%',
          // borderRadius: '23px',
          // boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }
      }
    >
      {cpn}
    </Box>
  );
}
