import { useState } from 'react';
import axios from 'axios';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import ImageUploader from '../articleCreateComponent/ImageUploader';
export default function StaffPickCreateForm() {
  const [form, setForm] = useState({ imgs: [], content: '' });

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
    console.log(value);
  };

  const submit = (e) => {
    e.preventDefault();
    axios({
      url: 'https://jejuiin-default-rtdb.asia-southeast1.firebasedatabase.app/',
      method: 'post',
      data: form,
    });
  };

  const getContent = (value) => {
    setForm({ ...form, content: value });
    console.log(form.content);
  };
  return (
    <form
      encType="multipart/form-data"
      style={{ display: 'flex', flexDirection: 'column', padding: '5%' }}
    >
      <label htmlFor="image">사진</label>

      <input
        name="imgs"
        id="image"
        type="file"
        accept="image/*"
        multiple
        value={form.imgs}
        onChange={handleForm}
      />
      <ImageUploader />

      <label htmlFor="content">내용</label>
      {/* <input
        name="content"
        id="content"
        type="text"
        value={form.content}
        onChange={handleForm}
      /> */}
      <MarkDownInput
        name="content"
        id="content"
        type="text"
        value={form.content}
        getContent={getContent}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          onClick={submit}
          sx={{ marginTop: '5rem', width: '40%', fontColor: 'white' }}
          variant="contained"
        >
          글 작성
        </Button>
      </Box>
    </form>
  );
}
