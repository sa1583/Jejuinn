import RecruitmentWrite from '../../components/work/RecruitmentWrite';
import WorkWriteComponent from '../../components/work/WorkWriteComponent';
import { useParams } from 'react-router-dom';
import { Button, styled, Box } from '@mui/material';
import { updateRecruitment } from '../../api/work';
import { selectAccessToken } from '../../store/user';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ImageUploader from '../../components/articleCreateComponent/ImageUploader';
import { useNavigate } from 'react-router-dom';

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

export default function WorkRecruitmentWrite() {
  const { recruitmentUid } = useParams();

  const navigate = useNavigate();
  if (recruitmentUid != 'undefined') {
    // 위에 디테일 처럼 공고 + 게하 정보 있는 페이지에서 직무 작성
    // 저장 누르면 해당 직무 디테일로 이동
    navigate(`/work-write/${recruitmentUid}/`);
  }

  // recruitmentUid === 'undefined'
  // 그냥 이 페이지에서 이미지, 공고, 직무 다 작성해서
  // 한번에 멀티파트로 저장해서 공고 POST

  const accessToken = useSelector(selectAccessToken);
  const [workInfo, setWorkInfo] = useState({});
  const [preImages, setPreImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [recruitmentInfo, setRecruimentInfo] = useState({});

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
    // 이미지 받고 직무랑 워크도 recruitmentbody로 만들어서 보내기
    const formData = new FormData();
    const recruitmentBody = {
      // images,
      works: workInfo,
      recruitment: recruitmentInfo,
    };

    files.forEach((file) => {
      formData.append('uploadImages', file);
    });

    fetch(updateRecruitment(recruitmentBody, accessToken));
  };

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
          uid={recruitmentUid}
        />
        <WorkWriteComponent
          onWorkWrite={onWorkWrite}
          currentWorkInfo={workInfo}
        />
        <Box sx={{ paddingTop: '2rem' }}>
          <CustomButton type="submit" onClick={onClick}>
            저장
          </CustomButton>
        </Box>
      </form>
    </Box>
  );
}
