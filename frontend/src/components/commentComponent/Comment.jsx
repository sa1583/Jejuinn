import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { deleteComment, updateComment } from '../../api/comment';
import { images } from '../../assets/images';
import { deepOrange } from '@mui/material/colors';

export default function CommentList({
  comment,
  accessToken,
  getComments,
  userInfo,
}) {
  const [putComment, setPutComment] = useState(comment.content);
  const changeComment = async () => {
    if (putComment !== '') {
      await updateComment(putComment, comment?.commentUid, accessToken);
      getComments();
    } else {
      alert('내용을 입력해주세요.');
    }
  };
  const commentDelete = async () => {
    await deleteComment(comment?.commentUid, accessToken);
    getComments();
  };

  const [changeStatus, setChangeStatus] = useState(false);
  const commentWriter = comment?.userUid;
  const loginedUser = userInfo?.uid;

  const profileImage = () => {
    const purl = comment.profileImgUrl;
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
    <Box sx={{ padding: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          paddingLeft: '0.5rem',
        }}
      >
        <Avatar
          src={profileImage()}
          sx={{
            width: '2rem',
            height: '2rem',
            marginTop: '0.5rem',
            bgcolor: deepOrange[500],
          }}
        ></Avatar>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '95%',
            }}
          >
            <Typography sx={{ fontWeight: 'bolder' }}>
              {comment.nickname}
            </Typography>
            {commentWriter === loginedUser && (
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                }}
              >
                <Button
                  sx={{ margin: 0, padding: 0 }}
                  onClick={() => {
                    setChangeStatus((prev) => !prev);
                    changeStatus && setPutComment(comment.content);
                  }}
                >
                  수정
                </Button>
                <Button sx={{ margin: 0, padding: 0 }} onClick={commentDelete}>
                  삭제
                </Button>
              </Box>
            )}
          </Box>
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
                minHeight: '2rem',
                width: '100%',
              }}
            >
              {/* <Typography
                variant="p"
                sx={{ marginTop: '0.3rem', width: '95%' }}
              >
                {comment.content}
              </Typography> */}

              {changeStatus ? (
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
                      paddingTop: '0.5rem',
                      marginTop: '0.5rem',
                      resize: 'none',
                    }}
                    rows="4"
                    placeholder="댓글을 입력해주세요. (최대 255자)"
                    maxLength={255}
                    value={putComment}
                    onChange={(e) => setPutComment(e.target.value)}
                  ></textarea>
                  <Box sx={{ display: 'flex' }}>
                    <Button
                      sx={{
                        fontWeight: 'bolder',
                        height: '3rem',
                        alignSelf: 'center',
                      }}
                      variant="contained"
                      onClick={changeComment}
                    >
                      수정
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Typography
                  variant="p"
                  sx={{ marginTop: '0.3rem', width: '95%' }}
                >
                  {comment.content}
                </Typography>
              )}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
