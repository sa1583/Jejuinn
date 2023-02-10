import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCommentList } from '../../api/comment';
import CommentBox from './CommentBox';
import { v4 as uuidv4 } from 'uuid';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { selectAccessToken, selectUserInfo } from '../../store/user';
import { useSelector } from 'react-redux';

export default function CommentsList() {
  const location = useLocation();
  const postUid = location.pathname.split('detail/')[1];
  const post = location.pathname.split('/')[1];
  const postType = post === 'guesthouse' ? 'GUEST_HOUSE' : 'REVIEW';
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);

  const [comments, setComments] = useState([]);
  const getComments = async () => {
    const data = (await getCommentList(postType, postUid)).data;
    setComments(data);
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <>
      <h2 style={{ color: '#FF7600' }}>댓글</h2>
      <CommentBox
        cpn={
          <CommentInput
            postType={postType}
            postUid={postUid}
            getComments={getComments}
            accessToken={accessToken}
            userInfo={userInfo}
          />
        }
      />
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          borderBottom: '3px solid #FF7600',
          margin: '10px 0 10px',
          borderRadius: '50px',
        }}
      ></div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {comments.map((comment) => {
          return (
            <CommentBox
              key={uuidv4()}
              cpn={
                <Comment
                  comment={comment}
                  accessToken={accessToken}
                  getComments={getComments}
                  userInfo={userInfo}
                />
              }
            />
          );
        })}
      </Box>
    </>
  );
}
