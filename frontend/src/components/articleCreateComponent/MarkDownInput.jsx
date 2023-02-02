import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function MarkDownInput({ getContent }) {
  return (
    <ReactQuill
      theme="snow"
      onChange={(content) => getContent(content)}
      style={{ height: '20rem' }}
    />
  );
}
