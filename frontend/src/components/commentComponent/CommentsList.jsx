import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCommentList } from '../../api/comment';
import { v4 as uuidv4 } from 'uuid';
import Comment from './Comment';
import CommentInput from './CommentInput';
import {
  selectAccessToken,
  selectIsLogin,
  selectUserInfo,
} from '../../store/user';
import { useSelector } from 'react-redux';

export default function CommentsList() {
  const location = useLocation();
  const postUid = location.pathname.split('detail/')[1];
  const post = location.pathname.split('/')[1];
  const postType = post === 'guesthouse' ? 'GUEST_HOUSE' : 'REVIEW';
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);
  const isLogined = useSelector(selectIsLogin);
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
      <CommentInput
        postType={postType}
        postUid={postUid}
        getComments={getComments}
        accessToken={accessToken}
        userInfo={userInfo}
        isLogined={isLogined}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '1vh',
          marginTop: '2vh',
        }}
      >
        {comments.length ? (
          ''
        ) : (
          <p
            style={{
              fontSize: '2.1vh',
              color: 'grey',
              margin: 'auto',
              marginTop: '2vh',
            }}
          >
            작성된 댓글이 없습니다
          </p>
        )}
        {comments.map((comment, index) => {
          return (
            <div key={uuidv4()}>
              {index ? (
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    borderBottom: '1px solid #DEDEDE',
                    margin: '0px 0',
                    borderRadius: '50px',
                  }}
                ></div>
              ) : (
                ''
              )}
              <Comment
                comment={comment}
                accessToken={accessToken}
                getComments={getComments}
                userInfo={userInfo}
              />
            </div>
          );
        })}
      </Box>
    </>
  );
}
