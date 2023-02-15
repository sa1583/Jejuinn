import RecruitmentWriteComponent from '../../components/work/RecruitmentWriteComponent';
import WorkWriteComponent from '../../components/work/WorkWriteComponent';
import { useParams } from 'react-router-dom';
import { Button, styled, Box } from '@mui/material';
import { createRecruitment, getMyRecruitments } from '../../api/work';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ImageUploader from '../../components/articleCreateComponent/ImageUploader';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)({
  variant: 'contained',
  width: '100%',
  height: '7vh',
  color: '#FFFFFF',
  borderRadius: '62px',
  backgroundColor: '#FF7600',
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

export default function WorkRecruitmentWrite() {
  const { guesthouseUid } = useParams();
  const accessToken = useSelector(selectAccessToken);

  const [preImages, setPreImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [files, setFiles] = useState([]);

  const [recruitmentInfo, setRecruimentInfo] = useState({});
  const [workInfo, setWorkInfo] = useState({});

  const navigate = useNavigate();

  const onWorkWrite = (input) => {
    console.log(input);
    setWorkInfo(input);
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
    console.log(workInfo, recruitmentInfo);
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
    setRecruimentInfo({ ...recruitmentInfo, guestHouseUid: guesthouseUid });
  }, []);

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
        <RecruitmentWriteComponent
          onRecruitmentWrite={onRecruitmentWrite}
          currentRecruitmentInfo={recruitmentInfo}
        />
        <WorkWriteComponent
          onWorkWrite={onWorkWrite}
          currentWorkInfo={workInfo}
        />
      </form>
      <Box sx={{ paddingTop: '2rem' }}>
        <CustomButton type="submit" onClick={onClick}>
          저장
        </CustomButton>
      </Box>
    </Box>
  );
}
