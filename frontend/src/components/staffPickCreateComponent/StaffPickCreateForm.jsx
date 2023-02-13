import { useState } from 'react';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box } from '@mui/system';
import { Button, Rating, Typography } from '@mui/material';
import ImageUploader from '../articleCreateComponent/ImageUploader';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/user';
import { createSpotReview } from '../../api/staffPick';
import { useNavigate } from 'react-router';

export default function StaffPickCreateForm({ nowPickId }) {
  const [content, setContent] = useState('');
  const acces_token = useSelector(selectAccessToken);
  const navigate = useNavigate();

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
    formData.append('review', blob);
    files.forEach((file) => {
      formData.append('uploadImages', file);
    });

    await createSpotReview(acces_token, formData);
    navigate(`/staffpicklist/${nowPickId}`);
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
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
        사진 (최대 10개)
      </Typography>

      <ImageUploader handleFiles={handleFiles} files={files} maxNum={10} />

      <Typography variant="h5" sx={{ marginBottom: '1rem', marginTop: '4rem' }}>
        글 내용
      </Typography>

      <MarkDownInput
        name="content"
        id="content"
        type="text"
        // value={content}
        getContent={getContent}
        content={content}
      />

      <Box
        sx={{
          alignSelf: 'center',
          marginTop: '7rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">평점</Typography>
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
