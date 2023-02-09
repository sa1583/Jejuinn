import * as React from 'react';
import {
  Box,
  Modal,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import WhiteBox from '../../components/whiteBox/WhiteBox';
import { useState } from 'react';

const CustomButton = styled(Button)({
  height: '6vh',
  color: '#ffffff',
  '&:hover': {
    background: 'primary',
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function SendSMS() {
  const [content, setContent] = useState('');

  const handleSendSMS = () => {
    // TODO: 문자메세지 전송 로직 작성
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} sx={{ color: 'white' }}>
        문자 보내기
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: '80%',
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ paddingX: '22%' }}>
            <WhiteBox
              cpn={
                <Box sx={{ padding: '4vh' }}>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: '24%',
                      color: '#FF7600',
                    }}
                    onClick={handleClose}
                  >
                    <CloseIcon sx={{ fontSize: '48px' }} />
                  </IconButton>

                  <Box sx={{ paddingTop: '20px' }}>
                    <Typography variant="h5">문자보내기</Typography>
                    <TextField
                      multiline
                      placeholder="내용을 입력해주세요"
                      rows={6}
                      InputProps={{
                        style: { fontSize: 20 },
                      }}
                      sx={{
                        display: 'flex',
                        marginY: '27px',
                        borderColor: 'primary',
                        borderRadius: '8px',
                      }}
                    />
                  </Box>
                  <CustomButton
                    variant="contained"
                    onClick={handleSendSMS}
                    sx={{
                      display: 'flex',
                      borderRadius: 7,
                      width: '40%',
                      margin: 'auto',
                    }}
                  >
                    <Typography sx={{ fontSize: 24 }}>문자전송하기</Typography>
                  </CustomButton>
                </Box>
              }
              sx={{ margin: 'auto' }}
            />
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
