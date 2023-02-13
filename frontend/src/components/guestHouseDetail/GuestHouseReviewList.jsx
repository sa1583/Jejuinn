import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';

export default function GuestHouseReviewList({ comment }) {
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
        <Avatar sx={{ width: '3rem', height: '3rem' }}>{comment.img}</Avatar>
        <Box sx={{ width: '100%' }}>
          <h4 style={{ margin: 0 }}>{comment.name}</h4>
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
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#646464' }}>
                {comment.comment}
              </p>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
