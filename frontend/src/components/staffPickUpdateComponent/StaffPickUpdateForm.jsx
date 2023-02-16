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
    setDeleteImages((prev) => [...prev, id]);
    setPreImages(preImages.filter((image) => image.uid !== id));
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
    await updateSpotReview(acces_token, formData, pageId);
    navigate(`/staffpicklist/detail/${pageId}`);
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

      <ImageUploader
        preImages={preImages}
        files={files}
        handleFiles={handleFiles}
        maxNum={10}
        handlePreImages={handlePreImages}
      />

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
        content={content}
        getContent={getContent}
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
          onClick={(e) => submit(e)}
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
        >
          수정 완료
        </Button>
      </Box>
    </form>
  );
}
