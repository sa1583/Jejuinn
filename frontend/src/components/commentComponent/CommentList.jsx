import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';

export default function CommentList({ comment }) {
  return (
    <Box sx={{ padding: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          paddingLeft: '0.5rem',
        }}
      >
        <Avatar sx={{ width: '2rem', height: '2rem', marginTop: '0.5rem' }}>
          {comment.img}
        </Avatar>
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ fontWeight: 'bolder' }}>{comment.name}</Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '2rem',
              }}
            >
              <Typography
                variant="p"
                sx={{ marginTop: '0.3rem', width: '90%' }}
              >
                {comment.comment}
              </Typography>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
