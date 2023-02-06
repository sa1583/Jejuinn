import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function MarkDownInput({ getContent }) {
  const modules = {
    toolbar: [[{ header: [1, 2, 3, false] }], ['bold'], ['link']],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
  ];
  return (
    <ReactQuill
      theme="snow"
      onChange={(content) => getContent(content)}
      style={{ height: '20rem' }}
      modules={modules}
      formats={formats}
    />
  );
}
