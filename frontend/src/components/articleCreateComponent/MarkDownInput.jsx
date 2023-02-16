import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function MarkDownInput({ getContent, content }) {
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ['bold'], ['link']],
  };

  const formats = ['header', 'bold', 'link'];
  return (
    <ReactQuill
      theme="snow"
      onChange={(content) => {
        getContent(content);
      }}
      style={{ height: '20rem' }}
      modules={modules}
      formats={formats}
      value={content}
      placeholder="큰 글자 폰트를 권장합니다."
    />
  );
}
