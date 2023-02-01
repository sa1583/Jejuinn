import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import styles from './CommentInput.module.css';
import { deepOrange } from '@mui/material/colors';

export default function CommentInput() {
  // 여기서 로그인한 유저 정보 redux에서 받아와서 AVATAR, 닉네임 넣으면 됨
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
        <Avatar
          sx={{ width: '2rem', height: '2rem', bgcolor: deepOrange[500] }}
        >
          Cho
        </Avatar>
        <Box sx={{ width: '100%' }}>
          <h5 style={{ margin: 0 }}>초이유태</h5>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <input
              type="text"
              placeholder="댓글을 입력하세요."
              className={styles.commentInp}
            />
            <Button
              sx={{ color: '#FF7600', fontWeight: 'bolder' }}
              variant="text"
            >
              작성
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
