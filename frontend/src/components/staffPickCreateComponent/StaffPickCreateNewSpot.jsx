import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { useState } from 'react';
import StepLabel from '@mui/material/StepLabel';
import MapApi from '../mapApi/MapApi';
import getAddressBySpot from '../../api/map';
import StaffPickCreateSpotName from './StaffPickCreateSpotName';
import StaffPickCreatSpotCheck from './StaffPickCreatSpotCheck';

export default function StaffPickCreateNewSpot({ open, handleClose }) {
  const steps = ['위치 선택', '이름 작성', '확인', '완료!'];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrior = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const getStaffPickCreateNewSpotCpn = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h3>명소의 위치를 선택해주세요.</h3>
            <div style={{ width: '100%' }}>
              <MapApi setNewPin={setNewPin} /> {area} {nowPick.lat}
            </div>
            <p>/</p>
            {nowPick.lng}
          </Box>
        );
      case 1:
        return <StaffPickCreateSpotName />;
      case 2:
        return <StaffPickCreatSpotCheck />;
    }
  };

  const [area, setArea] = useState('');
  const [nowPick, setNowPick] = useState('');

  const [newSpotName, setNewSpotName] = useState('');

  const setNewPin = async (e) => {
    const lat = e._lat;
    const lng = e._lng;
    setNowPick({ lat, lng });
    const data = await getAddressBySpot(lng, lat);
    const address = data.data.documents[0].address_name;
    setArea(address);
    setNewSpotName('');
  };

  return (
    <Modal sx={{ display: 'flex', justifyContent: 'center' }} open={open}>
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '2rem',
          width: '80%',
          height: '45rem',
          marginTop: '5rem',
        }}
      >
        <Typography
          sx={{ fontSize: '2vw', color: '#FF7600', fontWeight: 'bolder' }}
        >
          새로운 명소 등록
        </Typography>
        <Button
          onClick={() => {
            handleClose();
            setArea('');
            setNowPick('');
            setActiveStep(0);
          }}
          sx={{ position: 'absolute', right: 5, top: 5 }}
        >
          <HighlightOffIcon sx={{ color: 'primary.main', fontSize: '3rem' }} />
        </Button>
        <div style={{ width: '80%', marginTop: '3rem' }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ margin: ' 1rem 0 1rem 0' }}
          >
            {steps.map((label) => (
              <Step
                key={label}
                sx={{
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: '#FF7600', // circle color (COMPLETED)
                  },
                  '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                    {
                      color: 'black', // Just text label (COMPLETED)
                      fontWeight: 'bolder',
                    },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: 'primary', // circle color (ACTIVE)
                  },
                  '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                    {
                      color: '#FF7600', // Just text label (ACTIVE)
                      fontWeight: 'bolder',
                    },
                  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: 'white', // circle's number (ACTIVE)
                  },
                }}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStaffPickCreateNewSpotCpn()}
        </div>

        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            color: 'secondary.main',
          }}
          size="large"
          disabled={activeStep === 0 && nowPick.length === 0}
          onClick={handleNext}
        >
          다음
        </Button>
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            color: 'secondary.main',
          }}
          size="large"
          // disabled={activeStep === 0 && nowPick.length === 0}
          onClick={handlePrior}
          disabled={activeStep === 0}
        >
          이전
        </Button>
      </Box>
    </Modal>
  );
}
