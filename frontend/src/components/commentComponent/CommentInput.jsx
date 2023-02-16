import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Button, Typography } from '@mui/material';
// import styles from './CommentInput.module.css';

import { useState } from 'react';
import { createComment } from '../../api/comment';
import { images } from '../../assets/images';
import { useNavigate } from 'react-router-dom';

export default function CommentInput({
  postUid,
  postType,
  getComments,
  accessToken,
  userInfo,
  isLogined,
}) {
  // 여기서 로그인한 유저 정보 redux에서 받아와서 AVATAR, 닉네임 넣으면 됨
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const commentCreate = async () => {
    if (content !== '') {
      const body = {
        content,
        postUid,
        postType,
      };
      await createComment(body, accessToken);
      await getComments();
      setContent('');
    } else {
      alert('내용을 입력해주세요.');
    }
  };

  const profileImage = () => {
    const purl = userInfo?.profileImageUrl;
    if (purl) {
      if (purl.slice(0, 4) == 'http') {
        return purl;
      } else {
        return `${images.defalut_url}${purl}`;
      }
    } else {
      return '';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '15px',
        boxShadow: '0px 2px 74px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ padding: '1rem', paddingBottom: '0.7rem' }}>
        {isLogined ? (
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              paddingLeft: '0.5rem',
            }}
          >
            {userInfo.profileImageUrl ? (
              <Avatar
                sx={{
                  width: '2rem',
                  height: '2rem',
                  bgcolor: 'primary.main',
                  marginTop: '0.5rem',
                }}
                src={profileImage()}
              ></Avatar>
            ) : (
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  height: '2rem',
                  width: '2rem',
                  fontSize: '1rem',
                }}
              >
                {userInfo.nickname[0]}
              </Avatar>
            )}

            <Box sx={{ width: '100%' }}>
              <Typography sx={{ fontWeight: 'bolder' }}>
                {userInfo?.nickname}
              </Typography>
              {/* <Box sx={{ width: '100%' }}> */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <textarea
                  name=""
                  id=""
                  style={{
                    width: '85%',
                    height: '2rem',
                    paddingTop: '0.5rem',
                    paddingLeft: 0,
                    marginTop: '0.5rem',
                    resize: 'none',
                    border: 'none',
                    fontFamily: 'SUIT-Regular',
                    fontSize: '17px',
                    outline: 'none',
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
                      // fontFamily: 'SUIT-Regular',
                      // fontWeight: 'bolder',
                      // height: '3rem',
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
        ) : (
          <Box
            sx={{
              height: '3rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">
              댓글을 작성하려면{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ color: '#FF7600', cursor: 'pointer' }}
              >
                로그인
              </span>
              을 해주세요.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
