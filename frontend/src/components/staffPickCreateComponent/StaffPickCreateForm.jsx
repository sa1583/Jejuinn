import { useState } from 'react';
import axios from 'axios';
export default function StaffPickCreateForm() {
  const [form, setForm] = useState({ imgs: '', content: '' });

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios({
      url: 'https://jejuiin-default-rtdb.asia-southeast1.firebasedatabase.app/',
      method: 'post',
      data: form,
    });
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

      <label htmlFor="content">내용</label>
      <input
        name="content"
        id="content"
        type="text"
        value={form.content}
        onChange={handleForm}
      />
      <input type="submit" value="글 작성" onClick={submit} />
    </form>
  );
}
