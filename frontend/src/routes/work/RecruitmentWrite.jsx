import RecruitmentWriteComponent from '../../components/work/RecruitmentWriteComponent';
import WorkWriteComponent from '../../components/work/WorkWriteComponent';
import { useParams } from 'react-router-dom';
import { Button, styled, Box } from '@mui/material';
import { updateRecruitment, getMyRecruitments } from '../../api/work';
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

export default function RecruitmentWrite() {
  const { recruitmentUid } = useParams();
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);
  const [preImages, setPreImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [recruitmentInfo, setRecruimentInfo] = useState({});

  const getRecruitmentDetail = async () => {
    const data = (await recruitmentDetail(recruitmentUid)).data;
    console.log(data);
    setPreImages(data.images);
    setRecruimentInfo(data.recruitment);
  };

  const onRecruitmentWrite = (input) => {
    console.log(input);

    // 여길 바꿔야해... 그냥 input 말고 변경된 부분만 가져오게...
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
      // works: [workInfo],
      recruitment: recruitmentInfo,
    };

    const recruitmentBodyBlob = new Blob([JSON.stringify(recruitmentBody)], {
      type: 'application/json',
    });
    formData.append('recruitmentBody', recruitmentBodyBlob);

    files.forEach((file) => {
      formData.append('uploadImages', file);
    });

    fetch(updateRecruitment(formData, accessToken, recruitmentUid));

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
        <RecruitmentWriteComponent
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
