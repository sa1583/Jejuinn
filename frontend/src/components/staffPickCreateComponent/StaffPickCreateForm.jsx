import { useState } from 'react';
import axios from 'axios';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import ImageUploader from '../articleCreateComponent/ImageUploader';
export default function StaffPickCreateForm() {
  const [content, setContent] = useState('');
  // const submit = (e) => {
  //   e.preventDefault();
  //   axios({
  //     url: 'https://jejuiin-default-rtdb.asia-southeast1.firebasedatabase.app/',
  //     method: 'post',
  //     data: form,
  //   });
  // };

  const getContent = (value) => {
    setContent(value);
    console.log(content);
  };

  const [files, setFiles] = useState([]);
  const handleFiles = (datas) => {
    setFiles(datas);
  };
  return (
    <form
      encType="multipart/form-data"
      style={{ display: 'flex', flexDirection: 'column', padding: '5%' }}
    >
      <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
        사진 (최대 10개)
      </Typography>

      <ImageUploader handleFiles={handleFiles} files={files} />

      <Typography variant="h3" sx={{ marginBottom: '1rem', marginTop: '2rem' }}>
        글 내용
      </Typography>

      <MarkDownInput
        name="content"
        id="content"
        type="text"
        value={content}
        getContent={getContent}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          // onClick={submit}
          sx={{
            marginTop: '5rem',
            width: '40%',
            color: 'white',
            fontSize: '1.5rem',
          }}
          variant="contained"
        >
          글 작성
        </Button>
      </Box>
    </form>
  );
}
