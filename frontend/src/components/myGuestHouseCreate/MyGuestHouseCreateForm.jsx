import { useEffect, useState } from 'react';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box, TextField, Button, Typography } from '@mui/material';
import ImageUploader from '../articleCreateComponent/ImageUploader';
import PopupDom from '../popupPostCode/PopupDom';
import PopupPostCode from '../popupPostCode/PopupPostCode';
import {
  guestHouseCreate,
  guestHouseDetail,
  guestHouseUpdate,
} from '../../api/guestHouse';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
  selectAccessToken,
  selectIsLogin,
  selectUserInfo,
} from '../../store/user';
import { FilterGuestHouseStyle } from '../work/Filters';
import MapApi from '../mapApi/MapApi';

export default function MyGuestHouseCreateForm() {
  const accessToken = useSelector(selectAccessToken);
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();

  const [isCreate, setIsCreate] = useState();
  const [postUid, setPostUid] = useState();
  const [preImages, setPreImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [content, setContent] = useState('');
  const [pos, setPos] = useState();
  const [areaName, setAreaName] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const guestHouse = {
      guestHouseName: name,
      address,
      addressDetail,
      areaName,
      lng: pos.lng,
      lat: pos.lat,
      areaName,
      introduction: content,
      email,
      phone: phoneNumber,
      guestHouseTypes: selectedValues,
      representativeUid: userInfo.uid,
    };
    const guestHouseBlob = new Blob([JSON.stringify(guestHouse)], {
      type: 'application/json',
    });
    formData.append('guestHouse', guestHouseBlob);

    files.forEach((file) => {
      formData.append('uploadImages', file);
    });

    let id;
    if (!isCreate) {
      const deleteImagesBlob = new Blob([JSON.stringify(deleteImages)], {
        type: 'application/json',
      });
      formData.append('deleteImages', deleteImagesBlob);
      id = location.pathname.split('/')[3];
      await guestHouseUpdate(accessToken, id, formData);
    } else {
      id = (await guestHouseCreate(accessToken, formData)).data;
    }
    navigate(`/guesthouse/detail/${id}`);
  };

  const handlePreImages = (id) => {
    setDeleteImages((prev) => [...prev, id]);
    setPreImages(preImages.filter((image) => image.uid !== id));
  };

  const getContent = (value) => {
    setContent(value);
  };

  const [files, setFiles] = useState([]);

  const handleFiles = (datas) => {
    setFiles(datas);
  };

  // 주소 검색 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPostCode = () => {
    setIsPopupOpen(true);
  };
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const location = useLocation();
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (!isLogin) navigate('/login');
    if (location.pathname.split('/')[2] === 'create') {
      setIsCreate(true);
    } else {
      setIsCreate(false);
      setPostUid(location.pathname.split('/')[3]);
    }
  }, []);

  const getGuestHouseInfo = async () => {
    const { data } = await guestHouseDetail(postUid);
    setName(data.guestHouse.guestHouseName);
    setEmail(data.guestHouse.email);
    setPhoneNumber(data.guestHouse.phone);
    setAreaName(data.guestHouse.areaName);
    setAddress(data.guestHouse.address);
    setAddressDetail(data.guestHouse.addressDetail);
    setSelectedValues(data.guestHouse.guestHouseTypes);
    setContent(data.guestHouse.introduction);
    setPos({ id: 1, lat: data.guestHouse.lat, lng: data.guestHouse.lng });
    setPreImages(data.images);
    // data.images.map((image) => {
    //   imageUrltoFile(image.imgPath);
    // });
  };

  useEffect(() => {
    if (postUid) {
      getGuestHouseInfo();
    }
  }, [postUid]);

  return (
    <Box>
      <form
        encType="multipart/form-data"
        style={{ display: 'flex', flexDirection: 'column', padding: '5%' }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontFamily: 'GmarketSansBold',
            marginTop: 0,
            marginBottom: '60px',
            textAlign: 'center',
            color: '#FF7600',
          }}
        >
          {isCreate ? '게스트하우스 등록' : '게스트하우스 수정'}
        </h1>

        <TextField
          required
          label="게스트하우스 이름"
          variant="standard"
          placeholder="게스트하우스 이름을 입력하세요."
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          required
          label="이메일"
          variant="standard"
          placeholder="이메일을 입력하세요."
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />

        <TextField
          required
          label="전화번호"
          variant="standard"
          placeholder="전화번호를 입력하세요."
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          value={phoneNumber}
          onChange={({ target: { value } }) => setPhoneNumber(value)}
        />

        <TextField
          onClick={openPostCode}
          required
          label="주소"
          variant="standard"
          placeholder="주소를 입력하세요."
          disabled
          value={address}
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          onChange={({ target: { value } }) => setAddress(value)}
        />
        <div id="popupDom">
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode
                setAddress={setAddress}
                setDetailAddress={setAddressDetail}
                setPos={setPos}
                setAreaName={setAreaName}
                onClose={closePostCode}
              />
            </PopupDom>
          )}
        </div>

        <TextField
          label="상세주소"
          value={addressDetail}
          variant="standard"
          sx={{ marginY: '2vh', marginBottom: '50px' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          onChange={({ target: { value } }) => setAddressDetail(value)}
        />

        <MapApi spots={[pos]} startSpot={[pos]} high={'23rem'} />

        <Box my="20px" />

        <Typography sx={{ fontSize: 20, color: 'grey' }}>
          게스트하우스에 해당하는 스타일을 선택하세요.
        </Typography>
        <FilterGuestHouseStyle
          value={selectedValues}
          setValue={setSelectedValues}
        />
        <br />
        <br />

        <label
          htmlFor="image"
          style={{ fontSize: 20, color: 'grey', marginBottom: '10px' }}
        >
          게스트하우스 관련 이미지를 업로드 해주세요.(최대 10개)
        </label>
        <ImageUploader
          preImages={preImages}
          handlePreImages={handlePreImages}
          handleFiles={handleFiles}
          files={files}
          maxNum={10}
        />

        <br />
        <br />
        <label
          htmlFor="content"
          style={{ fontSize: 20, color: 'grey', marginBottom: '10px' }}
        >
          게스트하우스 소개 내용을 입력해주세요.
        </label>
        <MarkDownInput
          name="introduction"
          id="introduction"
          type="text"
          // value={form.content}
          getContent={getContent}
          content={content}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            disabled={
              !name ||
              !email ||
              !phoneNumber ||
              !address ||
              selectedValues.length === 0 ||
              (isCreate && files.length === 0) ||
              (!isCreate &&
                preImages.length + files.length - deleteImages.length === 0)
            }
            onClick={(e) => submit(e)}
            sx={{
              marginTop: '8rem',
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
            {isCreate ? '작성 완료' : '수정 완료'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
