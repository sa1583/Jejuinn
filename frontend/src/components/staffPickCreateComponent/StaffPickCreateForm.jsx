import { useState } from 'react';
import axios from 'axios';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box } from '@mui/system';
import { Button, Rating, Typography } from '@mui/material';
import ImageUploader from '../articleCreateComponent/ImageUploader';
import { useSelector } from 'react-redux';
import userSlice, { selectAccessToken } from '../../store/user';
import { createSpotReview } from '../../api/staffPick';
export default function StaffPickCreateForm({ nowPickId }) {
  const [content, setContent] = useState('');
  const acces_token = useSelector(selectAccessToken);

  const submit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append(
      'review',
      JSON.stringify({
        content,
        travelPlaceUid: nowPickId,
        starRating,
      }),
    );
    data.append('images', JSON.stringify(files));

    // files.forEach((file) => {
    //   data.append('images', file);
    // });
    // console.log(images);

    // console.log(files);
    // const data = {
    // review: {
    //   content,
    //   travelPlaceUid: nowPickId,
    //   starRating,
    // },
    //   images: images,
    // };
    // console.log(data);
    const result = await createSpotReview(acces_token, data);
    console.log(result);
  };
  const [starRating, setStarRating] = useState(1);

  const getContent = (value) => {
    setContent(value);
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

      <Box
        sx={{
          alignSelf: 'center',
          marginTop: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">평점</Typography>
        <Rating
          value={starRating}
          onChange={(event, newValue) => {
            setStarRating(newValue);
          }}
          size="large"
          sx={{ fontSize: '3rem' }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          onClick={submit}
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
