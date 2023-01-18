import Box from '@mui/material/Box';

export default function BoxLoginSignup(props) {
  return (
    <Box
      sx={{
        width: '80%',
        background: 'white',
        height: '80vh',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: '45%',
          height: '100%',
        }}
      >
        {props.content}
      </Box>
      <img src="images/Default_Image.jpg" alt="" style={{ width: '55%' }} />
    </Box>
  );
}
