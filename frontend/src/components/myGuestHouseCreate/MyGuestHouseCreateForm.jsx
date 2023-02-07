import { useState } from 'react';
import axios from 'axios';
import MarkDownInput from '../articleCreateComponent/MarkDownInput';
import { Box, TextField, Button } from '@mui/material';
import ImageUploader from '../articleCreateComponent/ImageUploader';
import PopupDom from '../popupPostCode/PopupDom';
import PopupPostCode from '../popupPostCode/PopupPostCode';

export default function MyGuestHouseCreateForm() {
  const [address, setAddress] = useState('');

  const [form, setForm] = useState({ imgs: [], content: '' });

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(form);
    // axios({
    //   url: '',
    //   method: 'post',
    //   data: form,
    // });
  };

  const getContent = (value) => {
    setForm({ ...form, content: value });
    console.log(form.content);
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
              <PopupPostCode setAddress={setAddress} onClose={closePostCode} />
            </PopupDom>
          )}
        </div>
        <TextField
          name="addressDetail"
          id="addressDetail"
          label="상세주소"
          placeholder="상세주소를 입력하세요."
          variant="standard"
          sx={{ marginY: '2vh' }}
          inputProps={{ style: { fontSize: 20 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
          onChange={handleForm}
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
          getContent={getContent}
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
