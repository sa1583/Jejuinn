import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
export default function WhitePage({ boxes }) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        gap: '4vw',
        paddingTop: '5vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '23%',
          gap: '3vh',
        }}
      >
        {boxes.lefts.map((left) => (
          <div key={uuidv4()}>{left}</div>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '45%',
          gap: '3vh',
        }}
      >
        {boxes.rights.map((right) => (
          <div key={uuidv4()}>{right}</div>
        ))}
      </Box>
    </Box>
  );
}
