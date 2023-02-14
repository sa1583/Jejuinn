import RecruitmentWrite from '../../components/work/RecruitmentWriteComponent';
import WorkWriteComponent from '../../components/work/WorkWriteComponent';
import { useParams } from 'react-router-dom';
import { Button, styled, Box } from '@mui/material';
import { createRecruitment, getMyRecruitments } from '../../api/work';
import { recruitmentDetail } from '../../api/work';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ImageUploader from '../../components/articleCreateComponent/ImageUploader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CustomButton = styled(Button)({
  variant: 'contained',
  width: '100%',
  height: '7vh',
  color: '#FFFFFF',
  borderRadius: '62px',
  backgroundColor: '#FF7600',
  fontFamily: 'border',
  size: 'large',
  '&:hover': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
  '&:active': {
    backgroundColor: '#FF7600',
    borderColor: '#FF7600',
  },
});

export default function () {
  const navigate = useNavigate();
  const { recruitmentUid } = useParams();
  const accessToken = useSelector(selectAccessToken);
  const [workInfo, setWorkInfo] = useState({});
  const [preImages, setPreImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [recruitmentInfo, setRecruimentInfo] = useState({});

  const getRecruitmentDetail = async () => {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    console.log(data);
    setPreImages(data.images);
    setWorkInfo(data.works);
    setRecruimentInfo(data.recruitment);
  };

  const onRecruitmentWrite = (input) => {
    console.log(input);
    setRecruimentInfo(input);
  };

  const handlePreImages = (id) => {
    setDeleteImages((prev) => [...prev, id]);
    setPreImages(preImages.filter((image) => image.uid !== id));
  };

  const handleFiles = (datas) => {
    setFiles(datas);
  };

  const onClick = () => {
    const formData = new FormData();
    const recruitmentBody = {
      works: [workInfo],
      recruitment: recruitmentInfo,
    };

    const recruitmentBodyBlob = new Blob([JSON.stringify(recruitmentBody)], {
      type: 'application/json',
    });
    formData.append('recruitmentBody', recruitmentBodyBlob);

    files.forEach((file) => {
      formData.append('uploadImages', file);
    });

    fetch(createRecruitment(formData, accessToken));
    navigate(`/worklist/`);
  };

  useEffect(() => {
    getRecruitmentDetail();
  }, []);

  console.log(recruitmentInfo);

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '10%' }}>
      <form>
        <ImageUploader
          preImages={preImages}
          files={files}
          handleFiles={handleFiles}
          maxNum={10}
          handlePreImages={handlePreImages}
        />
        <RecruitmentWrite
          onRecruitmentWrite={onRecruitmentWrite}
          currentRecruitmentInfo={recruitmentInfo}
        />
      </form>
      <br />
      <CustomButton type="submit" onClick={onClick}>
        저장
      </CustomButton>
    </Box>
  );
}
