import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';

import { useState } from 'react';
import SignAgree from './SignUpAgree';
import StepLabel from '@mui/material/StepLabel';
import SignUpInfo from './SignUpInfo';
import SignUpComplete from './SignUpComplete';
const steps = ['약관 동의', '정보 입력', '완료'];

export default function SignUpBox() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getSignUpCpn = () => {
    switch (activeStep) {
      case 0:
        return <SignAgree handleNext={handleNext} />;
      case 1:
        return <SignUpInfo handleNext={handleNext} />;
      case 2:
        return <SignUpComplete />;
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          // justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '90%',
          // paddingTop: '2rem',
          margin: 'auto',
          marginTop: '5vh',
        }}
      >
        <h2>회원가입</h2>
        <Box sx={{ width: '100%', marginTop: '1rem' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
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
        </Box>
        {getSignUpCpn()}
      </Box>
    </Box>
  );
}
