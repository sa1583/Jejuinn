import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import ReviewContent from '../../components/staffPickDetailComponent/ReviewContent';
import MapApi from '../../components/mapApi/MapApi';
import {
  deleteReviewDetail,
  getReviewDetail,
  getSpotInfo,
} from '../../api/staffPick';
import SpeedDialComponent from '../../components/speedDial/SpeedDialComponent';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSelector } from 'react-redux';
import {
  selectAccessToken,
  selectIsLogin,
  selectUserInfo,
} from '../../store/user';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import StaffPickSpotInfo from '../../components/staffPickComponent/StaffPickSpotInfo';

export default function StaffPickDetail() {
  // 리뷰 컨텐츠 내용
  const location = useLocation();
  const pageId = location.pathname.split('detail/')[1];
  const navigate = useNavigate();
  // 명소 좌표 정보
  const [spots, setSpots] = useState([]);

  const [reviewContent, setReviewContent] = useState({
    content: '',
    dateCreated: '',
    images: [],
    like: 0,
    starRating: 0,
    travelPlaceUid: '',
    uid: '',
    writer_nickname: '',
    writer_uid: '',
  });
  // 리뷰 정보와 명소 정보 받아오기
  const getReviewContent = async () => {
    const data = (await getReviewDetail(pageId)).data;
    setReviewContent(data);
    const info = (await getSpotInfo(data.travelPlaceUid)).data.travelPlace;
    setSpotInfo(info);
    setSpots([{ id: info.uid, lat: info.lat, lng: info.lng }]);
  };

  useEffect(() => {
    getReviewContent();
  }, []);

  // 명소 디테일 정보
  const [spotInfo, setSpotInfo] = useState({
    uid: '',
    name: '',
    address: '',
    starRatingAvg: 0,
  });
  const accessToken = useSelector(selectAccessToken);

  const deleteReview = async () => {
    await deleteReviewDetail(pageId, accessToken);
    alert('리뷰가 삭제되었습니다.');
    navigate('/staffpicklist');
  };

  const goUpdateReview = () => {
    navigate(`/staffpicklist/update/${pageId}`);
  };

  const loginedUserUid = useSelector(selectUserInfo)?.uid;
  const islogined = useSelector(selectIsLogin);

  const goCreate = () => {
    !islogined
      ? alert('로그인이 필요합니다.')
      : navigate('/staffpicklist/create');
  };

  const actions = () => {
    return loginedUserUid === reviewContent.writer_uid
      ? [
          {
            icon: <DeleteOutlineOutlinedIcon />,
            name: '리뷰 삭제',
            handle: deleteReview,
          },
          {
            icon: <DriveFileRenameOutlineOutlinedIcon />,
            name: '리뷰 수정',
            handle: goUpdateReview,
          },
          { icon: <ModeEditOutlinedIcon />, name: '글 작성', handle: goCreate },
        ]
      : [{ icon: <ModeEditOutlinedIcon />, name: '글 작성', handle: goCreate }];
  };

  return (
    <Box sx={{ paddingY: '3rem', paddingX: '19%' }}>
      {islogined && <SpeedDialComponent actions={actions()} />}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <WhiteBox cpn={<StaffPickSpotInfo selectedSpot={spotInfo} />} />
            </Grid>
            <Grid item xs={12}>
              <WhiteBox
                cpn={<MapApi spots={spots} startSpot={spots} high={'23rem'} />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <WhiteBox
            cpn={
              <ReviewContent
                reviewContent={reviewContent}
                pageId={pageId}
                islogined={islogined}
              />
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}
