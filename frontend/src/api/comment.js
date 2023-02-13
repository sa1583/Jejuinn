// import axios from 'axios';
// import { apiInstance } from './index';

import instance from '.';

// const api = apiInstance();

function createComment(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.post('/auth/comment', body, config);
}

function getCommentList(postType, postUid) {
  return instance.get(`/api/comment/${postType}/${postUid}`);
}

function updateComment(content, uid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.put(
    `/auth/comment?content=${content}&uid=${uid}`,
    {},
    config,
  );
}

function deleteComment(uid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return instance.delete(`/auth/comments/${uid}`, config);
}

export { createComment, getCommentList, updateComment, deleteComment };
