import Box from '@mui/material/Box';

export default function BoxLoginSignup(props) {
  return (
    <Box
      sx={{
        width: '60%',
        background: 'white',
        height: '68vh',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: '50%',
          height: '100%',
        }}
      >
        {props.content}
      </Box>
      <img src="images/Default_Image.jpg" alt="" style={{ width: '50%' }} />
    </Box>
  );
}
