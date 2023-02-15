import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { useEffect, useState } from 'react';
import StepLabel from '@mui/material/StepLabel';
import MapApi from '../mapApi/MapApi';
import getAddressBySpot from '../../api/map';
import StaffPickCreateSpotName from './StaffPickCreateSpotName';
import StaffPickCreatSpotCheck from './StaffPickCreatSpotCheck';
import StaffPickCreateSpotType from './StaffPickCreateSpotType';
import { createNewSpot } from '../../api/staffPick';
import StaffPickCreateNewSpotFinish from './StaffPickCreateNewSpotFinish';

export default function StaffPickCreateNewSpot({
  open,
  handleClose,
  getSpotsPins,
}) {
  const steps = [
    '위치 선택',
    '이름 선택',
    '유형·사진 선택',
    '확인',
    '등록 완료!',
  ];
  const [activeStep, setActiveStep] = useState(0);

  // 다음 스텝
  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep == 1) {
      const lng = nowPick[0].lng;
      const lat = nowPick[0].lat;
      const data = await getAddressBySpot(lng, lat);
      const address = data.data.documents[0].address_name;
      setArea(address);
    } else if (activeStep == 3) {
      const travelPlace = {
        name: spotName,
        category: newtype,
        address: area,
        areaName: shortArea,
        lat: nowPick[0].lat,
        lng: nowPick[0].lng,
      };
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(travelPlace)], {
        type: 'application/json',
      });

      formData.append('travelPlace', blob);
      formData.append('image', file[0]);

      await createNewSpot(formData);
    }
  };
  // 이전 스텝
  const handlePrior = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // 명소 이름
  const [spotName, setSpotName] = useState('');
  const handleSpotName = (e) => {
    setSpotName(e);
    getSpotFromStack();
  };

  const [file, setFile] = useState([]);
  const handleFile = (data) => {
    setFile(data);
  };

  // 좌표
  const [nowPick, setNowPick] = useState([{ lat: 33.3793, lng: 126.5497 }]);

  // 긴 주소
  const [area, setArea] = useState('');

  const [shortArea, setShortArea] = useState('');

  useEffect(() => {
    const areaArray = area.split(' ');
    if (areaArray.length === 3) {
      setShortArea(areaArray[1]);
    } else {
      setShortArea(areaArray[2]);
    }
  }, [area]);

  const [stack, setStack] = useState({});

  const getSpotFromStack = () => {
    const lat = stack.lat;
    const lng = stack.lng;
    setNowPick([{ lat, lng }]);
  };

  // 새로운 명소 장소 선택
  const setNewPin = async (e) => {
    const lat = e._lat;
    const lng = e._lng;
    setNowPick([{ lat, lng }]);
    setStack({ lat, lng });
  };

  const setNewPinByNameSearch = async (spot) => {
    const lng = spot.mapy;
    const lat = spot.mapx;
    setNowPick([{ lat, lng }]);
  };

  // 새로운 명소 유형 선택
  const [newtype, setNewType] = useState('');
  const handleType = (e) => {
    setNewType(e);
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
            <p style={{ fontSize: 24 }}>명소의 위치를 선택해주세요.</p>
            <div style={{ width: '85%' }}>
              <MapApi
                setNewPin={setNewPin}
                startSpot={nowPick}
                high={'23rem'}
              />{' '}
            </div>
          </Box>
        );
      case 1:
        return (
          <StaffPickCreateSpotName
            spotName={spotName}
            handleSpotName={handleSpotName}
            setNewPinByNameSearch={setNewPinByNameSearch}
          />
        );
      case 2:
        return (
          <StaffPickCreateSpotType
            newtype={newtype}
            handleType={handleType}
            file={file}
            handleFile={handleFile}
          />
        );

      case 3:
        return (
          <StaffPickCreatSpotCheck
            spotName={spotName}
            area={area}
            startSpot={nowPick}
            newtype={newtype}
            shortArea={shortArea}
          />
        );
      case 4:
        return <StaffPickCreateNewSpotFinish />;
    }
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
          minWidth: '700px',
        }}
      >
        <br />

        <Typography
          sx={{
            fontFamily: 'GmarketSansBold',
            fontSize: '2.5rem',
            color: 'primary.main',
          }}
        >
          새로운 명소 등록
        </Typography>
        <Button
          onClick={() => {
            handleClose();
            setArea('');
            setNowPick('');
            setActiveStep(0);
            setNewType('');
            setSpotName('');
            getSpotsPins();
            setFile([]);
          }}
          sx={{ position: 'absolute', right: 5, top: 5 }}
        >
          <HighlightOffIcon sx={{ color: 'primary.main', fontSize: '3rem' }} />
        </Button>
        <div style={{ width: '80%', marginTop: '1.5rem' }}>
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
                    color: '#FF7600',
                  },
                  '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                    {
                      color: 'black',
                      fontWeight: 'bolder',
                    },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: 'primary',
                  },
                  '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                    {
                      color: '#FF7600',
                      fontWeight: 'bolder',
                    },
                  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: 'white',
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
          disabled={
            (activeStep === 0 && nowPick.length === 0) ||
            activeStep === 4 ||
            (activeStep === 1 && spotName.length === 0) ||
            (activeStep === 2 && (newtype === '' || file.length === 0))
          }
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
          onClick={handlePrior}
          disabled={activeStep === 0 || activeStep === 4}
        >
          이전
        </Button>
      </Box>
    </Modal>
  );
}
