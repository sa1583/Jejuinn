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

    const uid = (await createSpotReview(acces_token, formData)).data;
    navigate(`/staffpicklist/detail/${uid}`);
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
      <Typography
        variant="h5"
        style={{
          fontSize: 22,
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        ② &nbsp;선택된 명소에 대한 리뷰를 작성해주세요!
      </Typography>
      <label
        htmlFor="image"
        style={{ fontSize: 20, color: 'grey', marginBottom: '10px' }}
      >
        명소 관련 이미지를 업로드 해주세요.(최대 10개)
      </label>

      <ImageUploader handleFiles={handleFiles} files={files} maxNum={10} />

      <br />
      <br />
      <label
        htmlFor="content"
        style={{ fontSize: 20, color: 'grey', marginBottom: '10px' }}
      >
        명소를 리뷰하는 내용을 입력해주세요.
      </label>

      <MarkDownInput
        name="content"
        id="content"
        type="text"
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
        <Typography
          variant="h5"
          style={{ fontSize: 20, color: 'grey', marginBottom: '10px' }}
        >
          해당 명소에 대한 평점을 매겨주세요
        </Typography>
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
            height: '3.5rem',
            width: '40%',
            fontSize: '1.8vh',
            fontColor: 'white',
            borderRadius: '50px',
            '&:hover': {
              background: '#FF7600',
            },
          }}
          variant="contained"
          disabled={
            files.length === 0 || content.length === 0 || nowPickId === ''
          }
        >
          작성 완료
        </Button>
      </Box>
    </form>
  );
}
