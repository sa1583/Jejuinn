import { useState } from 'react';
import axios from 'axios';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box, TextField, Button } from '@mui/material';
import ImageUploader from '../articleCreateComponent/ImageUploader';
import PopupDom from '../popupPostCode/PopupDom';
import PopupPostCode from '../popupPostCode/PopupPostCode';

export default function MyGuestHouseCreateForm() {
  // 주소 검색 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPostCode = () => {
    setIsPopupOpen(true);
  };
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const [address, setAddress] = useState('');

  const [form, setForm] = useState({ imgs: [], content: '' });
  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios({
      url: '',
      method: 'post',
      data: form,
    });
  };

  return (
    <Box>
      <form
        encType="multipart/form-data"
        style={{ display: 'flex', flexDirection: 'column', padding: '5%' }}
      >
        <h1 style={{ marginTop: 0 }}>게스트하우스 등록</h1>
        <TextField
          id="guestHouseName"
          label="게스트하우스 이름"
          variant="standard"
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
        />
        <TextField
          id="email"
          label="이메일"
          variant="standard"
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
        />
        <TextField
          id="phone"
          label="전화번호"
          variant="standard"
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
        />
        <div>
          <Button onClick={openPostCode}>우편번호 검색</Button>
          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode
                  setAddress={setAddress}
                  onClose={closePostCode}
                />
              </PopupDom>
            )}
          </div>
        </div>
        <TextField
          id="address"
          label="주소"
          variant="standard"
          value={address}
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
        />
        <TextField
          id="addressDetail"
          label="상세주소"
          variant="standard"
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
        />
        <br />
        <label htmlFor="image">이미지 업로드</label>
        <input
          name="imgs"
          id="image"
          type="file"
          accept="image/*"
          multiple
          value={form.imgs}
          onChange={handleForm}
        />
        <ImageUploader />

        <br />
        <label htmlFor="content">내용</label>
        <MarkDownInput
          name="content"
          id="content"
          type="text"
          value={form.content}
          // getContent={getContent}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            onClick={submit}
            sx={{ marginTop: '5rem', width: '40%', fontColor: 'white' }}
            variant="contained"
          >
            글 작성
          </Button>
        </Box>
      </form>
    </Box>
  );
}
