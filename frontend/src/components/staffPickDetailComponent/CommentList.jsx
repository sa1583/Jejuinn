import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';

export default function CommentList({ comment }) {
  return (
    <Box sx={{ padding: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          paddingLeft: '0.5rem',
        }}
      >
        <Avatar sx={{ width: '2rem', height: '2rem' }}>{comment.img}</Avatar>
        <Box sx={{ width: '100%' }}>
          <h5 style={{ margin: 0 }}>{comment.name}</h5>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '2rem',
                justifyContent: 'center',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.8rem' }}>{comment.comment}</p>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
