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

  // const yesi =
  // {
  //   review: {
  //     content: '쏼라쏼라맨',
  //     travelPlaceUid: 3,
  //     starRating: 3.5
  //   },
  //   images: [
  //     {첫번째 파일 정보},
  //     {두번째 파일 정보},
  //   ]
  // }

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const review = {
      content,
      travelPlaceUid: nowPickId,
      starRating,
    };

    const blob = new Blob([JSON.stringify(review)], {
      type: 'application/json',
    });
    // console.log(blob);
    // formData.append('review', JSON.stringify(review));
    formData.append('review', blob);
    // const newFiles = files.map((file) => JSON.stringify(file));
    // data.append('images', newFiles);
    // console.log(files);
    files.forEach((file) => {
      formData.append('images', file);
    });
    for (const key of formData.keys()) {
      console.log(key);
    }
    // FormData의 value 확인
    // @ts-ignore
    for (const value of formData.values()) {
      console.log(value);
    }
    // console.log(data.has('review'));
    // console.log(data.get('review'));
    // console.log(data.get('images'));
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
    const result = await createSpotReview(acces_token, formData);
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
