import axios from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

function createComment(body, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.post('/auth/comment', body, config);
}

function getCommentList(postType, postUid) {
  return api.get(`/api/comment/${postType}/${postUid}`);
}

function updateComment(content, uid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.put(`/auth/comment?content=${content}&uid=${uid}`, {}, config);
}

function deleteComment(uid, token) {
  const config = {
    headers: {
      accessToken: `Bearer ${token}`,
    },
  };
  return api.delete(`/auth/comments/${uid}`, config);
}

export { createComment, getCommentList, updateComment, deleteComment };
