import { useEffect, useState } from 'react';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box } from '@mui/system';
import { Button, Rating, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getReviewDetail, updateSpotReview } from '../../api/staffPick';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/user';
import ImageUploader from '../articleCreateComponent/ImageUploader';

export default function StaffPickUpdateForm() {
  const navigate = useNavigate();
  const acces_token = useSelector(selectAccessToken);
  const location = useLocation();
  const pageId = location.pathname.split('update/')[1];
  const [content, setContent] = useState('');
  const [starRating, setStarRating] = useState(1);

  const getContent = (value) => {
    setContent(value);
  };

  // 원래 있던 사진을 저장할 리스트
  const [preImages, setPreImages] = useState([]);

  // 원래 있던 사진 중 삭제할 사진 uid를 저장할 리스트
  const [deleteImages, setDeleteImages] = useState([]);

  // 원래 있던 사진을 다루는 로직
  const handlePreImages = (id) => {
    console.log('이전사진 다루기');
    setDeleteImages((prev) => [...prev, id]);
    // const deletedList = preImages.filter((image) => image.uid !== id)
    setPreImages(preImages.filter((image) => image.uid !== id));
    // setPreImages()
  };

  // 추가할 사진들을 저장할 리스트
  const [files, setFiles] = useState([]);

  // 추가할 사진을 저장하는 로직
  const handleFiles = (datas) => {
    setFiles(datas);
  };

  const getReviewContent = async () => {
    const review = (await getReviewDetail(pageId)).data;
    setContent(review.content);
    setStarRating(review.starRating);
    setPreImages(review.images);
    console.log(review.images);
  };

  useEffect(() => {
    getReviewContent();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const UpdateReviewPutReq = { starRating, content };
    const blob = new Blob([JSON.stringify(UpdateReviewPutReq)], {
      type: 'application/json',
    });
    formData.append('reviewContent', blob);
    files.forEach((file) => {
      formData.append('uploadImages', file);
    });
    // formData.append('uploadImages', files);
    const blob2 = new Blob([JSON.stringify(deleteImages)], {
      type: 'application/json',
    });
    formData.append('deleteImages', blob2);

    // for (let key of formData.keys()) {
    //   console.log(key);
    // }

    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
    }

    const data = await updateSpotReview(acces_token, formData, pageId);
    console.log(data);
    navigate(`/staffpicklist/detail/${pageId}`);
  };

  return (
    <form
      encType="multipart/form-data"
      style={{ display: 'flex', flexDirection: 'column', padding: '5%' }}
    >
      <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
        사진 (최대 10개)
      </Typography>
      {/* <ImageUploaderUpdate
        preImages={preImages}
        files={files}
        handleFiles={handleFiles}
        maxNum={10}
        handlePreImages={handlePreImages}
      /> */}
      <ImageUploader
        preImages={preImages}
        files={files}
        handleFiles={handleFiles}
        maxNum={10}
        handlePreImages={handlePreImages}
      />

      <Typography variant="h3" sx={{ marginBottom: '1rem', marginTop: '2rem' }}>
        글 내용
      </Typography>

      <MarkDownInput
        name="content"
        id="content"
        type="text"
        // value={content}
        content={content}
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
          onClick={(e) => submit(e)}
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
