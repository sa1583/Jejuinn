import { useState } from 'react';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box, TextField, Button, Autocomplete } from '@mui/material';
import ImageUploader from '../articleCreateComponent/ImageUploader';
import PopupDom from '../popupPostCode/PopupDom';
import PopupPostCode from '../popupPostCode/PopupPostCode';
import { guestHouseCreate } from '../../api/guestHouse';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUserInfo } from '../../store/user';

export default function MyGuestHouseCreateForm() {
  const access_token = useSelector(selectAccessToken);
  const userUid = useSelector(selectUserInfo).uid;
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [areaName, setAreaName] = useState('');

  const [form, setForm] = useState({});

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const guestHouse = {
      ...form,
      address,
      lng,
      lat,
      areaName,
      introduction: content,
      representativeUid: userUid,
    };
    const blob = new Blob([JSON.stringify(guestHouse)], {
      type: 'application/json',
    });
    console.log(guestHouse);
    formData.append('guestHouse', blob);
    files.forEach((file) => {
      formData.append('images', file);
    });

    // await guestHouseCreate(access_token, formData);
    // // navigate(`/guesthouse/detail/${guestHouseUid}`);
    // navigate(`/mypage/guesthouse`);
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

  return (
    <Box>
      <form
        encType="multipart/form-data"
        style={{ display: 'flex', flexDirection: 'column', padding: '5%' }}
      >
        <h1 style={{ marginTop: 0 }}>게스트하우스 등록</h1>

        <TextField
          required
          name="guestHouseName"
          id="guestHouseName"
          label="게스트하우스 이름"
          variant="standard"
          placeholder="게스트하우스 이름을 입력하세요."
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          onChange={handleForm}
        />

        <TextField
          required
          name="email"
          id="email"
          label="이메일"
          variant="standard"
          placeholder="이메일을 입력하세요."
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          onChange={handleForm}
        />

        <TextField
          required
          name="phone"
          id="phone"
          label="전화번호"
          variant="standard"
          placeholder="전화번호를 입력하세요."
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          onChange={handleForm}
        />

        <TextField
          onClick={openPostCode}
          required
          name="address"
          id="address"
          label="주소"
          variant="standard"
          placeholder="주소를 입력하세요."
          value={address}
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          onChange={handleForm}
        />
        <div id="popupDom">
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode
                setAddress={setAddress}
                setDetailAddress={setDetailAddress}
                setLng={setLng}
                setLat={setLat}
                setAreaName={setAreaName}
                onClose={closePostCode}
              />
            </PopupDom>
          )}
        </div>

        <TextField
          name="addressDetail"
          id="addressDetail"
          label="상세주소"
          placeholder="상세주소를 입력하세요."
          value={detailAddress}
          variant="standard"
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          onChange={handleForm}
        />
        <Autocomplete
          multiple
          limitTags={5}
          id="guestHouseTypes"
          name="guestHouseTypes"
          options={['파티', '조용한', '혼자', '술', 'ㅋㅋ']}
          sx={{ marginY: '2vh', marginBottom: '30px' }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="게스트하우스 스타일"
              InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
              placeholder="등록하려는 게스트하우스의 스타일을 선택해주세요."
            />
          )}
        />
        <br />

        <label htmlFor="image" style={{ fontSize: 20 }}>
          사진 (최대 10개)
        </label>
        <ImageUploader handleFiles={handleFiles} files={files} maxNum={10} />

        <br />
        <br />
        <label htmlFor="content" style={{ fontSize: 20 }}>
          글 내용
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
            onClick={submit}
            sx={{
              marginTop: '6rem',
              height: '3rem',
              width: '35%',
              fontColor: 'white',
            }}
            variant="contained"
          >
            글 작성
          </Button>
        </Box>
      </form>
    </Box>
  );
}
