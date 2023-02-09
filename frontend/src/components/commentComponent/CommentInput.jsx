import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Button, Typography } from '@mui/material';
// import styles from './CommentInput.module.css';
import { deepOrange } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../store/user';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { createComment } from '../../api/comment';

export default function CommentInput() {
  // 여기서 로그인한 유저 정보 redux에서 받아와서 AVATAR, 닉네임 넣으면 됨
  const userInfo = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);
  const location = useLocation();
  const postUid = location.pathname.split('detail/')[1];
  const post = location.pathname.split('/')[1];

  const [content, setContent] = useState('');

  const commentCreate = async () => {
    const postType = post === 'guesthouse' ? 'GUEST_HOUSE' : 'REVIEW';
    const body = {
      content,
      postUid,
      postType,
    };
    const data = await createComment(body, accessToken);
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          paddingLeft: '0.5rem',
        }}
      >
        <Avatar
          sx={{
            width: '2rem',
            height: '2rem',
            bgcolor: deepOrange[500],
            marginTop: '0.5rem',
          }}
        >
          Cho
        </Avatar>
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ fontWeight: 'bolder' }}>초이유태</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {/* <input
              type="text"
              placeholder="댓글을 입력하세요."
              className={styles.commentInp}
            /> */}
            <textarea
              name=""
              id=""
              style={{
                width: '85%',
                paddingTop: '0.5rem',
                marginTop: '0.5rem',
                resize: 'none',
              }}
              rows="4"
              placeholder="댓글을 입력해주세요. (최대 255자)"
              maxLength={255}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <Box sx={{ display: 'flex' }}>
              <Button
                sx={{
                  fontWeight: 'bolder',
                  height: '3rem',
                  alignSelf: 'center',
                }}
                variant="contained"
                onClick={commentCreate}
              >
                작성
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
